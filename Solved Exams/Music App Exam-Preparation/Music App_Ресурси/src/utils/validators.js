

export const albumIsInvalid = (albumData) => {
    const requireField = [
        'name',
        'imgUrl',
        'price',
        'releaseDate',
        'artist',
        'genre',
        'description',
    ];

    for(let field of requireField) {
        if (albumData[field] === '') {
            return true;
        }
    }
     
    return false;
}