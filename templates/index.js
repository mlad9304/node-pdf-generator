const fs = require('fs');
const dot = require('dot');

function replaceInTemplate() {
  const template = fs.readFileSync(`${__dirname}/../templates/pdf.html`, 'utf8');
  const templateFunc = dot.template(template);

  const itemData = processData();

  return templateFunc(itemData);
}

function processData() {
  const data = {
    assetPath: `file://${__dirname}`,
    total: {
      amount: 3,
      volume_gross: 5,
      weight: 4,
    },
    rooms: [
      {
        name: 'Room 1',
        items: [
          {
            name: 'item 1',
            detail: 10,
            description: 'This is item 1 in Room 1',
            amount: 3,
            volume: 4,
            weight: 2,
            total_volume: 5,
            dismantling: 0,
            total_weight: 4,
            one_man_handling: 1,
            packed_by: 2,
            unpacking: 3,
            assembling: 1,
            crate: 1,
          }
        ],
      },
    ],
    concierge: 'John',
    reference_number: '123',
    date: `${new Date().getDate()}.${new Date().getMonth() + 1 < 10 ? '0' + (new Date().getMonth() + 1).toString() : new Date().getMonth() + 1}.${new Date().getFullYear()}`
  };

  return data;
}

module.exports = replaceInTemplate;
