/**
 * Calculates the remaining HP of an Operator after being hit by Aak's S2 or S3.
 * @param hp The Hit Points stat of the Operator being targeted by Aak
 * @param modifiedDef The Defense stat of the Operator being targeted by Aak, after all buffs/debuffs have been applied
 */
function aakCalc(hp, modifiedDef){
    let damagePerHit = 500 - modifiedDef;

    if (damagePerHit <= 0){
        damagePerHit = 0.05 * 500;
    }

    for (let i = 0; i < 15; i++){
        hp -= damagePerHit;
    }

    if (hp <= 0){
        hp = 0;
    }

    return Math.round(hp);
}