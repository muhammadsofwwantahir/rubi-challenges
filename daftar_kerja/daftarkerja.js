//  const fs = require('fs');
//  const params = process.argv;
//  const readData = () => JSON.parse(fs.readFileSync('todo.json', 'utf8'));
//  const writeData = (data) => fs.writeFileSync('todo.json',JSON.stringify(data, null, 3), 'utf8');
//  let num = perseInt(params[3] - 1);
//  let data = readData();

//  const help = () => console.log('
//  >>> JS TODO <<<
//  $ node todo.js <command>
//  $ node todo.js list
//  $ node todo.js task <task_id>
//  $ node todo.js add tas <task_id>
//  $ node todo.js delete <task_id>
//  $ node todo.js complete <task_id>
//  $ node todo.js uncomplete <task_id>
//  $ node todo.js list:outstanding asc|desc
//  $ node todo.js tag <task_id> <tag_name_1> <tag_name_2> ... <tag_name_N>
//  $ node todo.js filter : <tag_name>
//  ');

// switch (params[2]) {
//     case 'add':
//         const output = params.slice(3).join(' ');
//         data.push(
//             {
//                 'task': output,
//                 'complete': false,
//                 'tag': []
//             }
//         );
//         writeData(data);
//         console.log(`'${output}' telah ditambahkan.`);
//         break;
//     case 'delete':
//         console.log(`'${data[num].task}' telah dihapus! `)
//         data.splice(num, 1);
//         writeData(data);
//         break;
//     case 'list':
//         console.log('Daftar Pekerjaan');
//         data.forEach((item, index) => {
//             console.log(`${index + 1}.${item.complete ? '[X]' : '[ ]'} ${item.task}`);
//         });
//         break;
//     case 'complete':
//         const completeTask = num;
//         data[completeTask].complete = true;
//         data[completeTask].tag = 'X';
//         console.log(`'${data[completeTask].task}' telah selesai!`)
//         writeData(data);
//         break;
//     case 'uncomplete':
//         const uncompleteTask = num;
//         data[uncompleteTask].complete = false;
//         data[completeTask].tag = ' ';
//         console.log(`'${data[completeTask].task}' belum selesai!`)
//         writeData(data);
//         break;
//     case 'list:outstanding':
//         console.log('Daftar Pekerjaan:\n')
//         if (params[3] === 'desc') {
//             for (let b = data.length - 1; b >= 0; b--) {
//                 if (data[b].complete === false) {
//                     console.log(`${b + 1}.${data[b].complete ? '[X]' : '[ ]'} ${data[b].task}`)
//                 }
//             }
//         } else if (params[3] === 'asc') {
//             for (let a = 0; a < data.length; a++) {
//                 if (data[a].complete === false) {
//                     console.log(`${a + 1}.${data[a].complete ? '[X]' : '[ ]'} ${data[a].task}`);
//                 }
//             }
//         };
//     break;
//     case 'list:complete':
//         console.log('Daftar Pekerjaan:');
//         if (params[3] === 'asc') {
//             for (let a = 0; a < data.length; a++) {
//                 if (data[a].complete === true) {
//                     console.log(`${a + 1}.${data[a].complete ? '[X]' : '[ ]'} ${data[a].task}`)
//                 }
//             }
//         } else if (params[3] === 'desc') {
//             for (let b = data.length - 1; b >= 0; b--) {
//                 if (data[b].complete === true) {
//                     console.log(`${b + 1}.${data[b].complete ? '[X]' : '[ ]'} ${data[b].task}`)
//                 }
//             }
//         };
//     break;
//     case 'tag':
//         data[num].tag = params.slice(4);
//         writeData(data);
//         console.log(`Tag '${params.slice(4).join(' ')}' telah ditambahkan ke daftar '${data[num].task}' .`)
//         break;
//     case 'filter':
//         for (let a = 0; a < data.length; a++) {
//             for (let b = 0; b < data[b].tag.length; b++) {
//                 if (params[4] === data[a].tag[b]) {
//                     console.log(`${a + 1} . ${data[a].task}`)
//                 }
//             }
//         };
//         break;
//     default:
//         help();
//         break;
// }

const fs = require('fs');
const params = process.argv;
const readData = () => JSON.parse(fs.readFileSync('todo.json', 'utf8'));
const writeData = (data) => fs.writeFileSync('todo.json', JSON.stringify(data, null, 3), 'utf8');
let num = parseInt(params[3] - 1);
let data = readData();

const help = () => console.log(`
>>> JS TODO <<<
$ node todo.js <command>
$ node todo.js list
$ node todo.js task <task_id>
$ node todo.js add <task_content>
$ node todo.js delete <task_id>
$ node todo.js complete <task_id>
$ node todo.js uncomplete <task_id>
$ node todo.js list:outstanding asc|desc
$ node todo.js list:complete asc|desc
$ node todo.js tag <task_id> <tag_name_1> <tag_name_2> ... <tag_name_N>
$ node todo.js filter : <tag_name>
`);

switch (params[2]) {
    case 'add':
        const output = params.slice(3).join(' ');
        data.push(
            {
                'task': output,
                'complete': false,
                'tag': []
            }
        );
        writeData(data);
        console.log(`'${output}' telah ditambahkan.`);
        break;
    case 'delete':
        console.log(`'${data[num].task}' telah dihapus! `)
        data.splice(num, 1);
        writeData(data);
        break;
    case 'list':
        console.log('Daftar Pekerjaan');
        data.forEach((item, index) => {
            console.log(`${index + 1}.${item.complete ? '[X]' : '[ ]'} ${item.task}`);
        });
        break;
    case 'complete':
        const completeTask = num;
        data[completeTask].complete = true;
        data[completeTask].tag = 'X';
        console.log(`'${data[completeTask].task}' telah selesai!`)
        writeData(data);
        break;
    case 'uncomplete':
        const uncompleteTask = num;
        data[uncompleteTask].complete = false;
        data[completeTask].tag = ' ';
        console.log(`'${data[completeTask].task}' belum selesai!`)
        writeData(data);
        break;
    case 'list:outstanding':
        console.log('Daftar Pekerjaan:\n')
        if (params[3] === 'desc') {
            for (let b = data.length - 1; b >= 0; b--) {
                if (data[b].complete === false) {
                    console.log(`${b + 1}.${data[b].complete ? '[X]' : '[ ]'} ${data[b].task}`)
                }
            }
        } else if (params[3] === 'asc') {
            for (let a = 0; a < data.length; a++) {
                if (data[a].complete === false) {
                    console.log(`${a + 1}.${data[a].complete ? '[X]' : '[ ]'} ${data[a].task}`);
                }
            }
        };
    break;
    case 'list:complete':
        console.log('Daftar Pekerjaan:');
        if (params[3] === 'asc') {
            for (let a = 0; a < data.length; a++) {
                if (data[a].complete === true) {
                    console.log(`${a + 1}.${data[a].complete ? '[X]' : '[ ]'} ${data[a].task}`)
                }
            }
        } else if (params[3] === 'desc') {
            for (let b = data.length - 1; b >= 0; b--) {
                if (data[b].complete === true) {
                    console.log(`${b + 1}.${data[b].complete ? '[X]' : '[ ]'} ${data[b].task}`)
                }
            }
        };
    break;
    case 'tag':
        data[num].tag = params.slice(4);
        writeData(data);
        console.log(`Tag '${params.slice(4).join(' ')}' telah ditambahkan ke daftar '${data[num].task}' .`)
        break;
    case 'filter':
        for (let a = 0; a < data.length; a++) {
            for (let b = 0; b < data[b].tag.length; b++) {
                if (params[4] === data[a].tag[b]) {
                    console.log(`${a + 1} . ${data[a].task}`)
                }
            }
        };
        break;
    default:
        help();
        break;
}