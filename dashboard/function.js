const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.operationTransaction = async (req, res) => {
  const { amount, categoryId, description, walletId } = req.body;
  const category = await prisma.category.findUnique({
    where: { id: categoryId },
  });
  if (!category) return res.status(404).json("wallet not found");
  if (category.operation == "INCOME") {
    const Income = await prisma.totalBalance.findMany({
      where: { userId: req.user.id },
      orderBy: { createdAt: "desc" },
      take: 1,
    });
    if (!Income || Income.length === 0) {
      const createIncome = await prisma.totalBalance.create({
        data: {
          balance: amount,
          expence: 0,
          income: amount,
          userId: req.user.id,
        },
      });
      const balanceId = createIncome.id;
      await transaction(
        req,
        res,
        amount,
        categoryId,
        description,
        walletId,
        balanceId
      );
    }
    const balance = Income[0].balance + amount;
    const income = Income[0].balance + amount;
    const updateIncome = await prisma.totalBalance.create({
      data: {
        balance: balance,
        expence: 0,
        income: income,
        user: { connect: { id: req.user.id } },
      },
    });
    const balanceId = updateIncome.id;
    await transaction(
      req,
      res,
      amount,
      categoryId,
      description,
      walletId,
      balanceId
    );
  }
  if (category.operation == "EXPENSE") {
    const Expense = await prisma.totalBalance.findMany({
      where: { userId: req.user.id },
      orderBy: { createdAt: "desc" },
      take: 1,
    });
    if (!Expense || Expense.length === 0) {
      const exBalance = 0 - amount;
      const createExpense = await prisma.totalBalance.create({
        data: {
          balance: exBalance,
          expence: amount,
          income: 0,
          userId: req.user.id,
        },
      });
      const balanceId = createExpense.id;
      await transaction(
        req,
        res,
        amount,
        categoryId,
        description,
        walletId,
        balanceId
      );
    }
    const balance = Expense[0].balance - amount;
    const expense = Expense[0].expence + amount;
    const updateExpense = await prisma.totalBalance.create({
      data: {
        balance: balance,
        expence: expense,
        income: 0,
        user: { connect: { id: req.user.id } },
      },
    });
    const balanceId = updateExpense.id;
    await transaction(
      req,
      res,
      amount,
      categoryId,
      description,
      walletId,
      balanceId
    );
  }
};

async function transaction(
  req,
  res,
  amount,
  categoryId,
  description,
  walletId,
  balanceId
) {
  console.log(amount, categoryId, "  ", description, walletId, balanceId);
  const transAction = await prisma.transaction.upsert({
    where: {
      balanceId: balanceId,
    },
    update: {
      amount: amount,
      description: description,
      categoryId: categoryId,
      walletId: walletId,
      balanceId: balanceId,
    },
    create: {
      amount: amount,
      description: description,
      categoryId: categoryId,
      walletId: walletId,
      balanceId: balanceId,
    },
  });
  if (!transAction) return res.status(400).json("Transaction not created");
  console.log(transAction);
  return res.status(203).json(transAction);
}

// exports.operationTransaction = async (req, res) =>{

//     const {amount, categoryId, description, walletId} = req.body;
//     const category =  await prisma.category.findUnique({where:{id:categoryId}});
//     if (!category) return res.status(404).json("wallet not found")
//     if (category.operation == "INCOME"){
//         console.log("INCOME")
//         const balance = await prisma.totalBalance.create({
//             where:{
//                 unique: req.user.id,
//             },
//             update:{
//                 balance:{
//                     increment: amount,
//                 },
//                 income: {
//                     increment: amount
//                 }
//             },
//             create:{
//                 userId: req.user.id,
//                 balance: amount,
//                 income: amount,
//                 expence: 0,
//             },
//         });
//         if(!balance) return res.status(400).json("INCOME operation faild!");
//         const balanceId = balance.id;
//         await transaction(req, res ,amount, categoryId, description, walletId, balanceId);

//     } else if (category.operation == "EXPENSE"){
//         console.log("EXPESE")
//         const _balance = await prisma.totalBalance.findUnique({where:{userId:req.user.id}})
//         if (_balance) {
//             const balance = await prisma.totalBalance.update({
//                 where:{
//                     userId: req.user.id,
//                 },
//                 data:{
//                     balance:{
//                         decrement: amount,
//                     },
//                     expence: {
//                         increment: amount
//                     }
//                 }
//             });
//             if(!balance) return res.status(400).json("EXPENSE operation faild!");
//             const balanceId = balance.id;
//             await transaction(req, res ,amount, categoryId, description, walletId, balanceId);
//         }else{
//             console.log("Else EXPENCE")
//             const _balance = 0-amount;
//             const balance = await prisma.totalBalance.create({
//                data:{
//                     userId: req.user.id,
//                     balance: _balance,
//                     expence: amount,
//                     income:0,
//                     userId : req.user.id
//                 }
//             });
//             if(!balance) return res.status(400).json("EXPENSE operation faild!");
//             const balanceId = balance.id;
//             await transaction(req, res, amount, categoryId, description, walletId, balanceId);
//         }
//     }
// }
