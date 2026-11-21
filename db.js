const DB_NAME = "sany-business-margin";
const DB_VERSION = 2;
const STORES = ["products","sales","expenses","suppliers","customers","supplierPayments","customerPayments","settings"];
export function openDB(){
  return new Promise((resolve,reject)=>{
    const req=indexedDB.open(DB_NAME,DB_VERSION);
    req.onupgradeneeded=()=>{const db=req.result;for(const name of STORES){if(!db.objectStoreNames.contains(name))db.createObjectStore(name,{keyPath:"id"});}};
    req.onsuccess=()=>resolve(req.result);req.onerror=()=>reject(req.error);
  });
}
export async function all(store){const db=await openDB();return new Promise((res,rej)=>{const r=db.transaction(store).objectStore(store).getAll();r.onsuccess=()=>res(r.result);r.onerror=()=>rej(r.error);});}
export async function put(store,item){const db=await openDB();return new Promise((res,rej)=>{const tx=db.transaction(store,"readwrite");tx.objectStore(store).put(item);tx.oncomplete=()=>res(item);tx.onerror=()=>rej(tx.error);});}
export async function remove(store,id){const db=await openDB();return new Promise((res,rej)=>{const tx=db.transaction(store,"readwrite");tx.objectStore(store).delete(id);tx.oncomplete=()=>res();tx.onerror=()=>rej(tx.error);});}
export async function seedIfEmpty(){
 const products=await all("products");if(products.length)return;
 const now=Date.now(), day=86400000;
 const sample=[
  ["RC Racing Car","TOY-001","🏎️","RC Toys",650,990,12,"AA batteries",8],
  ["Princess Doll Set","TOY-002","👸","Dolls",420,690,18,"None",14],
  ["Building Blocks 120pc","TOY-003","🧱","Educational/STEM",350,590,20,"None",22],
  ["Classic Teddy Bear","TOY-004","🧸","Soft Toys",280,450,15,"None",5],
  ["Jigsaw Puzzle 100pc","TOY-005","🧩","Board Games",190,350,25,"None",3],
  ["Mini Drone","TOY-006","🚁","RC Toys",1450,1990,12,"Rechargeable",4],
  ["Kids Basketball Set","TOY-007","🏀","Outdoor",520,850,16,"None",9],
  ["Learning Tablet","TOY-008","📱","Educational/STEM",780,1190,14,"Rechargeable",7]
 ];
 for(const [name,sku,emoji,category,cost,price,age,battery,stock] of sample)
  await put("products",{id:sku,name,sku,emoji,category,cost,price,wholesale:price-80,ageGroup:"3-5y",battery,stock,display:0,damaged:0,updatedAt:now,lastSoldAt:now-70*day});
 await put("sales",{id:"SALE-DEMO-01",items:[{productId:"TOY-001",name:"RC Racing Car",qty:1,cost:650,price:990}],subtotal:990,total:990,paid:990,due:0,payment:"Cash",createdAt:now-3600000});
 await put("sales",{id:"SALE-DEMO-02",items:[{productId:"TOY-002",name:"Princess Doll Set",qty:1,cost:420,price:690}],subtotal:690,total:690,paid:500,due:190,payment:"bKash",customerId:"CUS-DEMO-01",customerName:"Demo Customer",createdAt:now-7200000});
 await put("expenses",{id:"EXP-DEMO-01",title:"Shop electricity",category:"Electricity",amount:350,createdAt:now-1800000});
 await put("expenses",{id:"EXP-DEMO-02",title:"Transport",category:"Transport",amount:120,createdAt:now-86400000});
 await put("customers",{id:"CUS-DEMO-01",name:"Demo Customer",phone:"01XXXXXXXXX",balance:190,createdAt:now-2*day});
 await put("suppliers",{id:"SUP-DEMO-01",name:"Toy Wholesale House",phone:"01XXXXXXXXX",balance:2500,createdAt:now-5*day});
}
