const URL_REGX = new RegExp(
  "^(http[s]?:\\/\\/(www\\.)?|ftp:\\/\\/(www\\.)?|(www\\.)?){1}([0-9A-Za-z-\\.@:%_+~#=]+)+((\\.[a-zA-Z]{2,3})+)(/(.)*)?(\\?(.)*)?"
);

export function validateURL(url) {
  return new Promise((resolve, reject) => {
    if (!URL_REGX.test(url)) {
      reject(false); 
    }
    resolve(true);
  });
}


export function validateDate(date){
  return new Promise((resolve, reject) => {
    if(isNaN(Date.parse(date))){
      reject(false);
    }
    resolve(true);
  })
}


export function notLessThanCurrent(dateTime){
  return new Promise((resolve, reject) => {
    if(new Date().toISOString() > new Date(dateTime).toISOString()){
      reject("You can not set from date time before present time");
    }
    resolve(true);
  })
}
