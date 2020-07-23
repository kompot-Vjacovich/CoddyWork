function same(massiv1, massiv2) {
	if(massiv1.length != massiv2.length) {
  	alert("Массивы не равны, так как они разной длины");
  	return
   }
	for(let i = 0; i < massiv1.length; i++) {
  	if(massiv1[i] != massiv2[i]) {
    	alert("Массивы не совпадают, так как " + (i+1) + "-е элементы не равны");
    	return 
    }
  }
  alert("Массивы равны"); 
  return 
}

same([1,2,3,4],[4,5,6,7]);
same([1,2,3,3,1],[1,3,2,3,1]);
same([1,2,3],[1,2,3]);
same([1,2,3],[1,2,3,4]);