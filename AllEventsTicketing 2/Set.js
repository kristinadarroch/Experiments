function Set() {

    //Finds the intersection of two list

    this.intersection = function(listA, listB) {
        var resultList = []; // create a resultList array

        if (listA === null || listB === null) { // check for invalid inputs
            return null; // exit and return null to indicate an error

        }

        for (var i = 0; i < listA.length; i++) { // for every element in listA
            var nextValue = listA[i]; // get next value in the list

            // for every element in listB
            for (var j = 0; j < listB.length; j++) {
                if (listB[j] === nextValue ) { // this listB element equals nextValue
                    resultList.push(listB[j]); // add listB element to end of resultList
                    break; // break out of (exit) the listB inner loop

                }
            } // end listB inner loop
        } // end listA outer loop
        return resultList;
    }



    this.union = function(listA, listB) {

        var resultList = new Array();

        if (listA === null || listB === null){
            return null;
        }

        for (var i = 0; i < listA.length; i++){
            var check = true;
            var nameA = listA[i];
            for (var j = 0; j < listB.length; j++){
                var nameB = listB[j];
                if (nameA === nameB){
                    resultList.push(nameA);
                    check = false;
                    break;
                }
            }
            if (check === true){
                resultList.push(nameA);
            }
        }
        for (var i = 0; i < listB.length; i++){
            var check = true;
            var nameB = listB[i];
            for (var j = 0; j < resultList.length; j++) {
                var nameR = resultList[j];
                if (nameB === nameR){
                    check = false;
                    break;
                }
            }
            if (check === true){
                resultList.push(nameB);
            }
        }

        return resultList;
    }




    this.relativeComplement = function(listA, listB) {

        var resultList = new Array();

        if (listA === null || listB === null) { // check for invalid inputs
            return null; // exit and return null to indicate an error

        }
        for (var i = 0; i < listA.length; i++){
            var check = true;
            var nameA = listA[i];
            for (var j = 0; j < listB.length; j++){
                var nameB = listB[j];
                if (nameA === nameB){
                    check = false;
                    break;
                }
            }
            if (check === true){
                resultList.push(nameA);
            }
        }

        return resultList;
    }



    this.symmetricDifference = function(listA, listB) {

        var resultList = new Array();

        if (listA === null || listB === null){
            return null;
        }

        for (var i = 0; i < listA.length; i++){
            var check = true;
            var nameA = listA[i];
            for (var j = 0; j < listB.length; j++){
                var nameB = listB[j];
                if (nameA === nameB){
                    check = false;
                    break;
                }
            }
            if (check === true){
                resultList.push(nameA);
            }
        }
        for (var i = 0; i < listB.length; i++){
            var check = true;
            var nameB = listB[i];
            for (var j = 0; j < listA.length; j++) {
                var nameA = listA[j];
                if (nameB === nameA){
                    check = false;
                    break;
                }
            }
            if (check === true){
                resultList.push(nameB);
            }
        }


        return resultList;
    }


}