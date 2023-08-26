const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { operationTransaction } = require("../function");
const { use } = require("../routes/dashboard");

exports.dashboard = async (req, res) => {
  const totalBalance = await prisma.totalBalance.findMany();
  const transaction = await prisma.transaction.findMany({
    skip: 0,
    take: 12,
  });
  const wallet = await prisma.wallet.findMany();
  res.status(200).json([transaction, wallet, totalBalance]);
};

exports.transaction = async (req, res) => {
  await operationTransaction(req, res);
};

exports.addWallet = async (req, res) => {
  const { name, colors, currency, description } = req.body;
  const user = req.user;
  const wallet = await prisma.wallet.upsert({
    where: {
      userId: user.id,
    },
    update: {
      name: name,
      colors: colors,
      currency: currency,
      description: description,
    },
    create: {
      name: name,
      colors: colors,
      currency: currency,
      description: description,
      user: {
        connect: {
          id: user.id,
        },
      },
    },
  });

  if (!wallet) return res.status(400).json("Wallet do not created");
  return res.status(300).json(wallet);
};
exports.addCategory = async (req, res) => {
  const { name, colors, operation, description } = req.body;
  const category = await prisma.category.upsert({
    where: {
      name: name,
    },
    update: {
      name: name,
      colors: colors,
      operation: operation,
      description: description,
    },
    create: {
      name: name,
      colors: colors,
      operation: operation,
      description: description,
    },
  });
  if (!category) return res.status(400).json("Category not created");
  return res.status(300).json(category);
};

exports.sendUserData = async (req, res) => {
  const userData = await prisma.user.findUnique({
    where: {
      email: req.user.email,
    },
    select:{
      id:true,
      firstName:true,
      lastName:true,
      email: true,
      total_balance:true,
      wallet:true,
      createdAt:true,
      password:false,
    }
  });
  if (!userData){
    return res.status(404).json("msg: User not found");
  };
  res.status(200).json(userData);
};
