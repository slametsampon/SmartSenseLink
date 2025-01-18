const { exec } = require('child_process');
exec(
  'arduino-cli upload --port /dev/ttyUSB0 --fqbn esp32:esp32:esp32c3 --filesystem --input-dir ./data',
  (err) => {
    if (err) console.error('Upload error:', err);
    else console.log('Uploaded to LittleFS.');
  }
);
