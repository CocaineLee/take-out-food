var loadAllItems=require('../src/items');
var loadPromotions=require('../src/promotions');

function bestCharge(selectedItems) {

  let itemData=dataFormat(selectedItems);
  let detailData=addDataDetail(itemData);
  let total=0;
  detailData.forEach(element =>{
    total+=element.price*element.num;
  });
  let halfPriceRes=halfPrice(detailData,total);
  let minuSixRes=total;
  if(total>=30){
    minuSixRes=minusSix(total);
  }
  let res,choice;
  if(minuSixRes<=halfPriceRes){
    res=minuSixRes;
    choice=0;
  }
  else{
    res=halfPriceRes;
    choice=1;
  }
  let discount=Math.round(total-res);
  if(discount===0) choice=2;
  return showOrderInf(choice,discount,detailData,res);
}


function dataFormat(selectedItems){
  let itemData=[];
  selectedItems.forEach(element => {
    itemData.push(element.split("x"));
  });
  itemData.forEach(element =>{
    element[0]=element[0].trim();
    element[1]=element[1].trim();
  });
  return itemData;
}


function addDataDetail(itemdata){
  let detailData=[];
  let allItemsData=loadAllItems();
  itemdata.forEach(element =>{
    allItemsData.forEach(data =>{
      if(element[0]===data.id){
        detailData.push({id:data.id,name:data.name,price:data.price, num : element[1]-0});
      }
    });
  });
  return detailData;
}

function halfPrice(detailData,total){
  let promInf=loadPromotions();
  detailData.forEach(element => {
    promInf[1].items.forEach(data =>{
      if(element.id===data){
        total-=element.num*element.price/2;
      }
    });
  });
  return total;
}

function minusSix(total)
{
  return total-=parseInt(total/30)*6;
}

function showOrderInf(choice,discount,detailData,res){
  let orderInf='';
  orderInf+='============= 订餐明细 =============\n';
  detailData.forEach(element =>{
    orderInf+= element.name+' x '+element.num+' = '+element.num*element.price+'元\n'; 
  });
  orderInf+='-----------------------------------\n'
  if(choice===2){
    orderInf+='总计：'+res+'元\n===================================';
  }
  else if(choice===1){
    orderInf+='使用优惠:\n指定菜品半价(黄焖鸡，凉皮)，省'+discount+'元\n'+
    '-----------------------------------\n'+
    '总计：'+res+'元\n'+
    '===================================\n';
  }
  else{
    orderInf+='使用优惠:\n'+'满30减6元'+'，省'+discount+'元\n'+
    '-----------------------------------\n'+
    '总计：'+res+'元\n'+
    '===================================\n';
  }
  return orderInf;
}
module.exports={dataFormat:dataFormat,addDataDetail:addDataDetail,halfPrice:halfPrice,minusSix:minusSix,bestCharge:bestCharge};