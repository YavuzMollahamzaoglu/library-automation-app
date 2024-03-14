import { PrismaClient } from "@prisma/client";
import express from "express";
import bcrypt from "bcrypt";

const app = express();
const port = 3000;

app.use(express.json());

const prisma = new PrismaClient();

app.listen(3000, function () {
  console.log("Example app listening on port 3000!");
});

app.post("/customer", async (req, res) => {
  try {
    const { username, password, email, bookName } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const customer = await prisma.customer.create({
      data: {
        username,
        password: hashedPassword,
        email,
        customerBooks: {},
      },
    });

    res.send(`User is created successfully.Username:${req.body.username}`);
  } catch (error) {
    console.error("Error while creating customer:", error);
  }
});

app.post("/customer/:customerId/addbook", async (req, res) => {
  try {
    const { bookName } = req.body;
    const customerId = parseInt(req.params.customerId);

    const existingCustomer = await prisma.customer.findUnique({
      where: { customerId },
    });

    if (!existingCustomer) {
      return res.status(404).send({ message: "Customer not found" });
    }

    const existingBook = await prisma.book.findFirst({
      where: { bookName: bookName },
    });

    if (!existingBook) {
      return res.status(404).send({ message: "Book not found" });
    }

    // Müşteriye kitap ekle
    const updatedCustomer = await prisma.customer.update({
      where: { customerId },
      data: {
        customerBooks: {
          connect: { bookId: existingBook.bookId },
        },
      },
    });

    res.send(`Book added to customer successfully`);
  } catch (error) {
    console.error("Error while adding book to customer:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

app.post("/book", async (req, res) => {
  try {
    const bookName = req.body.bookName || "DefaultBookName";
    const Book = await prisma.book.create({
      data: {
        bookName,
        author: {
          create: {
            authorName: req.body.authorName || "DefaultAuthorName",
          },
        },
      },
    });

    res.send(`Book added to system. Book name:${req.body.bookName}`);
  } catch (error) {
    console.error("Error while creating customer:", error);
  }
});

app.put("/customer/:username", async (req, res) => {
  const { username } = req.params;

  const existingCustomer = await prisma.customer.findFirst({
    where: {
      OR: [{ username }],
    },
  });

  if (!existingCustomer) {
    return res.status(404).send({ message: "User not found" });
  }

  const customer = await prisma.customer.update({
    where: {
      username: req.params.username,
    },
    data: {
      password: req.body.password,
    },
  });

  res.send({ message: "Your password updated successfully" });
});

app.get("/customer", async (req, res) => {
  const email = req.query.email as string;

  if (email) {
    const customerWithBooks = await prisma.customer.findFirst({
      where: { email },
      include: {
        customerBooks: true,
      },
    });

    if (!customerWithBooks) {
      res.status(404);
      return res.send({ message: "User not found" });
    }

    return res.send({ count: 1, data: [customerWithBooks] });
  }

  const customersWithBooks = await prisma.customer.findMany({
    include: {
      customerBooks: true,
    },
  });

  res.send({
    count: customersWithBooks.length,
    data: customersWithBooks || [],
  });
});

app.get("/book", async (req, res) => {
  const book = await prisma.book.findMany();
  res.send({ data: book });
});

app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await prisma.customer.findUnique({
      where: { username },
    });

    if (!user) {
      return res.status(401).send({ message: "Invalid username " });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).send({ message: "Invalid password" });
    }

    res.send({ message: "Login successful" });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

app.get("/bookcount", async (req, res) => {
  try {
    const bookCounts = await prisma.transaction.groupBy({
      by: ["bookId"],
      _count: true,
    });

    if (!bookCounts || bookCounts.length === 0) {
      return res.status(404).send({ message: "No book transactions found" });
    }

    const mostBoughtBookId = bookCounts.reduce((prev, current) => {
      return prev._count > current._count ? prev : current;
    }).bookId;

    const mostBoughtBook = await prisma.book.findUnique({
      where: { bookId: mostBoughtBookId },
    });

    res.send({ mostBoughtBook });
  } catch (error) {
    console.error("Error fetching most bought book:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

app.get("/customer/:customerId/history", async (req, res) => {
  try {
    const customerId = parseInt(req.params.customerId);

    const customerTransactions = await prisma.transaction.findMany({
      where: {
        customerId: customerId,
      },
      include: {
        book: true,
      },
      orderBy: {
        timestamp: "desc",
      },
    });

    res.send({ customerTransactions });
  } catch (error) {
    console.error("Error fetching customer transaction history:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

async function main() {}

main()
  .then(async () => {
    await prisma.$disconnect;
  })
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });
