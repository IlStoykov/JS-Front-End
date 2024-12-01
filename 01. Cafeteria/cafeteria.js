function solve(input) {
    const baristaCount = Number(input.shift());
    const team = {};

    // Initialize baristas
    for (let i = 0; i < baristaCount; i++) {
        const [name, shift, coffeeTypes] = input.shift().split(' ');
        team[name] = {
            shift,
            coffeeTypes: coffeeTypes.split(','),
        };
    }

    let commandLine = input.shift();

    while (commandLine !== 'Closed') {
        const [command, name, firstArg, secondArg] = commandLine.split(' / ');
        const barista = team[name];

        switch (command) {
            case 'Prepare':
                const shift = firstArg;
                const coffeeType = secondArg;

                if (barista.shift === shift && barista.coffeeTypes.includes(coffeeType)) {
                    console.log(`${name} has prepared a ${coffeeType} for you!`);
                } else {
                    console.log(`${name} is not available to prepare a ${coffeeType}.`);
                }
                break;

            case 'Change Shift':
                const newShift = firstArg;
                barista.shift = newShift;
                console.log(`${name} has updated his shift to: ${newShift}`);
                break;

            case 'Learn':
                const newCoffeeType = firstArg;
                if (barista.coffeeTypes.includes(newCoffeeType)) {
                    console.log(`${name} knows how to make ${newCoffeeType}.`);
                } else {
                    barista.coffeeTypes.push(newCoffeeType);
                    console.log(`${name} has learned a new coffee type: ${newCoffeeType}.`);
                }
                break;
        }

        commandLine = input.shift();
    }
    
    for (const baristaName in team) {
        console.log(`Barista: ${baristaName}, Shift: ${team[baristaName].shift}, Drinks: ${team[baristaName].coffeeTypes.join(', ')}`);
    }
}
solve([
    '3',
    'Alice day Espresso,Cappuccino',
    'Bob night Latte,Mocha',
    'Carol day Americano,Mocha',
    'Prepare / Alice / day / Espresso',
    'Change Shift / Bob / day',
    'Learn / Carol / Latte',
    'Learn / Bob / Mocha',
    'Prepare / Bob / day / Mocha',
    'Closed',
]);
