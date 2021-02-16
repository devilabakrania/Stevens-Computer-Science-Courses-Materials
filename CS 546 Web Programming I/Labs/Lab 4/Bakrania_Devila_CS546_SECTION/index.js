const animals = require("./data/animals");
const connection = require("./mongoConnection");

const main = async () => {
    const Sasha = await animals.create("Sasha","Dog");
    
    console.log(Sasha);

    const Lucy = await animals.create("Lucy","Dog");

    const allMyAnimals = await animals.getAll();
    console.log(allMyAnimals);

    const Duke = await animals.create("Duke","Walrus");
    console.log(Duke);

    const Sashita = await animals.rename(String(Sasha._id),"Sashita");
    console.log(Sashita);

    const RemoveLucy = await animals.remove(String(Lucy._id));
    console.log(RemoveLucy);

    const allMyAnimals2 = await animals.getAll();
    console.log(allMyAnimals2);

    const db = await connection();
    await db.serverConfig.close();

    console.log("All Operation successfully Done!");
};
main().catch(error => {
    console.log(error);
});
