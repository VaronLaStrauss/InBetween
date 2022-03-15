let points = 0;

for (let i = 1; i <= 5; i++) {
  console.log(`======= Round ${i} =======\n`);
  const card1 = Math.floor(Math.random() * 13);
  const card2 = Math.floor(Math.random() * 13);

  console.log(`Card 1\t\t: ${card1}`);
  console.log(`Card 2\t\t: ${card2}\n`);

  let arrChoices = ["NO DEAL"];
  if (card1 === card2) {
    arrChoices = [...arrChoices, "HIGHER", "LOWER"];
  } else {
    arrChoices = [...arrChoices, "DEAL"];
  }

  console.log(`Choices\t\t: ${arrChoices.join(", ")}`);
  let choice = prompt(`Option\t\t: `).toUpperCase().trim();
  while (!choice || !arrChoices.includes(choice)) {
    console.log("======= Please enter a valid choice =======");
    choice = prompt(`Option\t\t: `).toUpperCase().trim();
  }

  console.log();
  const card3 = Math.floor(Math.random() * 13);
  console.log(`Card 3\t\t: ${card3}\n`);

  const minCard = Math.min(card1, card2);
  const maxCard = Math.max(card1, card2);
  if (choice === "NO DEAL") {
    points -= 0.5;
    console.log("Status\t\t: NO DEAL");
    continue;
  }

  if (choice === "DEAL") {
    if (card3 < maxCard && card3 > minCard) {
      points += 1;
      console.log("Status\t\t: WIN");
    } else {
      points -= 1;
      console.log("Status\t\t: LOSE");
    }
    continue;
  }

  if (card1 === card2) {
    if (
      (card3 > card1 && choice === "HIGHER") ||
      (card3 < card1 && choice === "LOWER")
    ) {
      points += 1;
      console.log("Status\t\t: WIN");
    } else {
      points -= 1;
      console.log("Status\t\t: LOSE");
    }
  }
  console.log("\n");
}

console.log(`\nTotal Score\t: ${points} Points`);
