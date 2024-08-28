const SERVER_URL = "http://localhost:3000";

export function delItem(id:number) {
    return fetch(SERVER_URL+'/delItem?id='+id).then(res=>res.json())
  }

export function statusUpdate(id:number) {
    return fetch(SERVER_URL+'/updateItem?id='+id).then(res=>res.json())
}

export function addNewItem(text: string) {
    return fetch(SERVER_URL+'/addItem?text='+text).then(res=>res.json())
}

export function editItem(id: number, edits: string) {
    return fetch(SERVER_URL+'/editItem?itemID='+id+'&text='+edits).then(res=>res.json())
}