const colorPallete = {
    grass:  'rgb(80,180,80)',
    fire:   'rgb(255,150,80)',
    water:  'rgb(100,150,255)',
    bug:    'rgb(130,240,130)',
    normal: 'rgb(180,180,180)',
    poison: 'rgb(180,50, 180)',
    electric:'rgb(240,200,0)',
    ground: 'rgb(250,100,0)',
    fairy:  'rgb(255,170,170)',
    fighting:'rgb(255,20,100)',
    psychic:'rgb(160,50,200)',
    rock:   'rgb(150,150,150)',
    ghost:  'rgb(160,0,50)',
    ice:    'rgb(150,150,255)',
    dragon: 'rgb(255,50,50)',
    dark:   'rgb(100,120,120)',
    steel:  'rgb(100,150,200)',
}

export const addColorToBackground = (style, colorName) => {
    return {
        ...style,
        backgroundColor: colorPallete[colorName] ? 
            colorPallete[colorName] :
            'white', 
    }
}

export default colorPallete;