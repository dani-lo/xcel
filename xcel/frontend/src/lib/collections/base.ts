// export class BaseCollection<T> {

//   saveableKeys : string[]
  
//   constructor (saveableKeys : string[]) {
//     this.saveableKeys = saveableKeys
//   }

//   serialize () {
    
//     return this.saveableKeys.reduce((acc: Partial<T>, k : string) => {

//       if (k in this) {
//         const val : any = this[k] 

//         return Object.assign({}, acc, {[k] : this[k] as unknown})
//       }

//       return acc
//     }, {})
//   }
// }