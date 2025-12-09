import prisma from "./client.js";

async function addUserToDB() {
  const user = await prisma.user.create({
    data: {
      name: 'Taimoor',
      email: 'taimoorali@gmail.com',
    }
  })

  console.log(`${user.name} with the email ${user.email} has been added to the database`);
}

addUserToDB()
  .then(async () => {
    await prisma.$disconnect();    
  }).catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });