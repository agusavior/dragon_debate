import { exec } from 'child_process'


function fileNameMovToMp4(filename: string) {
    return filename.slice(27, -4) + '.mp4'
}

function command(filename: string) {
    // Best quality:
    // return `ffmpeg -i content/${filename} -q:v 0 content/${fileNameMovToMp4(filename)}`
    return `ffmpeg -i content/${filename} -vcodec copy -acodec copy content/${fileNameMovToMp4(filename)}`
}

export default async function movToMp4(filename: string, callback: (filename: string) => void) {
    console.log('command(filename)', command(filename))

    exec(command(filename), (err, stdout, stderr) => {
        
        if (err) {
          console.log(`exec error: ${err}`);
          return callback(filename);;
        }
      
        console.log(`exec stdout len: ${stdout.length}`);
        console.log(`exec stderr len: ${stderr.length}`);

        return callback(fileNameMovToMp4(filename));
    });
}