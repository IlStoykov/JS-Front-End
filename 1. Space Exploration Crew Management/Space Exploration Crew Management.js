function spaceCrew(input) {
    const teamMember = Number(input.shift());
    const team = {};
    
    for (let i = 0; i < teamMember; i++) {
        const [name, section, skills] = input.shift().split(' ');
        team[name] = {
            section,
            skills: skills.split(','),
        };
    }
    let commandLine = input.shift();

    while (commandLine !== "End") {
        const [command, name, ...args] = commandLine.split(' / ');

        const member = team[name];

        switch (command) {
            case "Perform":
                const section = args[0];
                const skill = args[1];
                if (member.section === section && member.skills.includes(skill)) {
                    console.log(`${name} has successfully performed the skill: ${skill}!`);
                } else {
                    console.log(`${name} cannot perform the skill: ${skill}.`);
                }
                break;

            case "Transfer":
                const newSection = args[0];
                member.section = newSection;
                console.log(`${name} has been transferred to: ${newSection}`);
                break;

            case "Learn Skill":
                const newSkill = args[0];
                if (member.skills.includes(newSkill)) {
                    console.log(`${name} already knows the skill: ${newSkill}.`);
                } else {
                    member.skills.push(newSkill);
                    console.log(`${name} has learned a new skill: ${newSkill}.`);
                }
                break;

            default:
                console.log(`Invalid command: ${command}`);
        }

        commandLine = input.shift();
    }

    
    for (const memberName in team) {
        const man = team[memberName];
        man.skills.sort();
        console.log(
            `Astronaut: ${memberName}, Section: ${man.section}, Skills: ${man.skills.join(', ')}`
        );
    }
};

spaceCrew([
    "2",
    "Alice command_module piloting,communications",
    "Bob engineering_bay repair,maintenance",
    "Perform / Alice / command_module / piloting",
    "Perform / Bob / command_module / repair",
    "Learn Skill / Alice / navigation",
    "Perform / Alice / command_module / navigation",
    "Transfer / Bob / command_module",
    "Perform / Bob / command_module / maintenance",
    "End"
  ]
  );
  