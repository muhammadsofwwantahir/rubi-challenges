const readline = require('readline');
const fs = require('fs');

switch (process.argv[2]) {
  case `${process.argv[2]}`:

    fs.readFile(`${process.argv[2]}`, 'utf8', (err, jsonString) => {
      if (err) {
        throw (err)
      } else {
        let data = JSON.parse(jsonString)
        const rl = readline.createInterface({
          input: process.stdin,
          output: process.stdout,
          prompt: 'Jawaban: '
        });

        let count = 0;
        let wrong = 1;
        console.log('Selamat datang di permainan Tebak-tebakan, kamu akan diberikan pertanyaan dari file ini ' + `'${process.argv[2]}'`)
        console.log("Untuk bermain, jawablah dengan jawaban yang sesuai.")
        console.log("Gunakan 'skip' untuk menangguhkan pertanyaannya, dan di akhir pertanyaan akan ditanyakan lagi.\n");
        console.log(`Pertanyaan: ${data[count].question}`)
        rl.prompt();
        
        rl.on('line', (line) => {
          if (line.toLowerCase() === data[count].answer) {
            console.log('\nAnda Beruntung!\n')
            count++
            if (count === data.length) {
              console.log(`Anda Berhasil!`)
              rl.close();
            } else {
              console.log(`Pertanyaan: ${data[count].question}`)
              rl.prompt();
            }
          } else if ( line === 'skip') {
            data.push(data[count])
            count++
            console.log(`\nPertanyaan: ${data[count].question}`)
            rl.prompt()
          } else {
            console.log(`\nAnda Kurang Beruntung! anda telah salah ${wrong} kali, silahkan coba lagi.\n`)
            wrong++;
            rl.prompt();
          }
        }).on('close', () => {
          process.exit(0);
        });
      }
    });

    break;
  default:
    console.log('Tolong sertakan nama file sebagai inputan soalnya');
    break;
}