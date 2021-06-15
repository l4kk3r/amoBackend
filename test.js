const obj = {apple: 1, orange: 2, tomato: 3}
Object.keys(obj).forEach(key => obj[key] > 2 ? obj[key] += 1 : null)
console.log(obj)