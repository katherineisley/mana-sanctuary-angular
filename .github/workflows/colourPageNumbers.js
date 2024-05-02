const fs = require('fs');

function colourDataPages(filePath) {
  const fileContent = fs.readFileSync(filePath, 'utf-8');

  const regex = /("(paragraph|combo)"):\s*"([^"]*)"/g; // because of JSON structure we have to match for both "paragraph": and "combo":

  let matchesFound = 0;

  const coloredContent = fileContent.replace(regex, (match, key, _, paragraph) => {
    const coloredParagraph = paragraph.replace(/(?<!<span class=\\"num-clr\\">)\b(\d{1,3}(?:,\d{3})*(?:\.\d+)?%?|\d+(?:\.\d+)?%?)(?![^<]*<\/span>)/g, (match) => {
      matchesFound++;
      return `<span class=\\"num-clr\\">${match}</span>`;
    });
    return `${key}: "${coloredParagraph}"`;
  });

  console.log(`Found ${matchesFound} matches in ${filePath.split('/').pop()}`);

  fs.writeFileSync(filePath, coloredContent);
}

['src/assets/json/simulacra-data.json', 'src/assets/json/matrices-data.json', 'src/assets/json/relics-data.json'].forEach(f => colourDataPages(f));