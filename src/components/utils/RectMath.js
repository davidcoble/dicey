export function isPointInRect({point, rect} = {}) {
    // console.log("isPointInRect called with point="+JSON.stringify(point))
    // console.log("isPointInRect called with rect="+JSON.stringify(rect))
    if (point.x < rect.left) return false;
    if (point.x > rect.left + rect.width) return false;
    if (point.y < rect.top) return false;
    if (point.y > rect.top + rect.height) return false;
    return true;
}