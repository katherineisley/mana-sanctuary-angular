const fs = require('fs');

// Read the JSON file
let data = JSON.parse(fs.readFileSync('simulacra-data.json', 'utf8'));

// Roles and poperties
const roles = ['MDPS', 'Buffer', 'Healer', 'SupportBuffer', 'Shatter', 'Taunt'];
const properties = ['isMDPS', 'isBuffer', 'isHeal', 'isSupportBuffer', 'isShatter', 'isTaunt'];

for (const character in data) {
  for (let i = 0; i < roles.length; i++) {
    if (data[character][properties[i]]) {
      data[character].roles.push(roles[i]);
    }
    // Delete the redundant boolean properties
    delete data[character][properties[i]];
  }

  console.log(data[character].name.toUpperCase());
  console.log('"roles":', JSON.stringify(data[character].roles));
  console.log('-----');
}

// Modify the file, the null and 2 are for identation
fs.writeFileSync('simulacra-data.json', JSON.stringify(data, null, 2));