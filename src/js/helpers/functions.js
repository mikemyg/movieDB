export const lessString = (str) => {
    if (str.length > 500) {
      let newString = (str.substring(0, 500) + "...")
        return `${newString}`
    }
    else {
        return str;
    }
  }
  
export const  sanitizeHTML = (str) => {
      var temp = document.createElement('div');
      temp.textContent = str;
      return temp.innerHTML;
  };