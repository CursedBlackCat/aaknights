let characterData = null;

fetch("character_table.json")
    .then(r => r.json())
    .then(json => characterData = json)
    .then(loadOperators);

function getOperatorList(){
    let result = [];
    for (const op in characterData){
        let data = characterData[op];
        if (data.subProfessionId !== "notchar1" && data.subProfessionId !== "notchar2"){
            result.push(data.name);
        }
    }
    return result;
}

function getOperatorData(name){
    for (const op in characterData){
        if (characterData[op].name === name){
            return characterData[op];
        }
    }
    return null;
}

/**
 * Calculates an operator's stats at a given promotion rank and level.
 * @param name The operator's name.
 * @param elite The operator's promotion rank. Either 0, 1, or 2.
 * @param level The operator's level.
 */
function calculateOperatorStats(name, elite, level){
    let keyframes = [];
    let operatorData = getOperatorData(name);
    if (operatorData) {
        for (let i = 0; i < operatorData.phases[elite].attributesKeyFrames.length; i++) {
            keyframes[i] = operatorData.phases[elite].attributesKeyFrames[i];
        }

        let result = {};

        result.maxHp = Math.round(everpolate.linear([level], [keyframes[0].level, keyframes[1].level], [keyframes[0].data["maxHp"], keyframes[1].data["maxHp"]]));
        result.def = Math.round(everpolate.linear([level], [keyframes[0].level, keyframes[1].level], [keyframes[0].data["def"], keyframes[1].data["def"]]));

        return result;
    }
}

// function statsInterpolation(operator,key,level,elite_no,isround=true){
//
//
//
//     var kf = [];
//     $.each(operator.phases[elite_no].attributesKeyFrames,function(j,v){
//         kf[j] = v;
//     });
//     // console.log([kf[0].level,kf[1].level])
//     // console.log([kf[0].data[key],kf[1].data[key]])
//     if(kf[0].data[key] == kf[1].data[key]){
//         return kf[0].data[key]
//     }else {
//         var pol = everpolate.linear([level],[kf[0].level,kf[1].level],[kf[0].data[key],kf[1].data[key]]);
//         if(isround)
//             return Math.round(pol);
//         else
//             return parseFloat(Math.round(pol*100))/100;
//     }
//
// }

function loadOperators(){
    let list = getOperatorList();
    let datalist = document.getElementById("operators");

    for (let i = 0; i < list.length; i++){
        const node = document.createElement("option");
        node.setAttribute("value", list[i]);
        datalist.appendChild(node);
    }
}