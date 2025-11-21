//Создаем текущее состояние Погоды(Музыка/Задний фон)
let weatherState: string = ''

//Получаем id основновного элемента div в котором будет создано приложение, как в React :)
const rootDiv = document.getElementById("root")

//Выдаем ошибку если произошла ошибка при получении объекта id root
if (!rootDiv) {
    throw new Error("Element div with id root not found")
}

//Стилизуем основной блог под ТЗ
rootDiv.style.textAlign = 'center'
rootDiv.style.color = 'orange'

//Получаем body для изменения заднего фона
const bodyElement = document.getElementsByTagName("body")[0]

//Добавляем аудио объект для воспроизведения и остановки музыки по кликам по картинкам
let audioElement: HTMLAudioElement = document.createElement("audio")

//Добавляем аудио объект в div id root для отображения
rootDiv.append(audioElement)

//Создаем регулятор громкости для управления музыкой(audioElement)
const audioSetting = document.createElement("input")
audioSetting.type = "range"
audioSetting.id = "volumeSlider"
audioSetting.min = "0"
audioSetting.max = "1"
audioSetting.step = "0.01"
audioSetting.value = "1"
audioSetting.style.width = '70px'
audioSetting.style.height = '5px'

//Добавляем мониторинг за событием изменения уровня громкости музыки
audioSetting.addEventListener('input', function() {
    audioElement.volume = parseFloat(audioSetting.value)
})


//Создаем функцию для создания картинок и стилизуем их
function createWeatherImage(src: string, id: string): HTMLImageElement {
    const img = document.createElement("img")
    img.src = src
    img.id = id
    img.style.margin = '5px'
    img.style.borderRadius = '28px'
    return img
}

//Создаем функцию для изменения музыки по клику на картинку погоды
const changeSound = (e: MouseEvent): void => {
    const target = e.target as HTMLImageElement
    (weatherState !== target.id && audioElement.src != '') ? changeBackGround(target.id) : (audioElement.paused) ? (audioElement.src == '') ? changeBackGround(`${target.id}`) : audioElement.play() : audioElement.pause()
}

//Создаем функцию для изменения фона в зависимости от выбранной погоды по картинке
function changeBackGround(initialBG: string): void {
    if (bodyElement) {
        bodyElement.style.background = `url(../img/${initialBG}-bg.jpg) no-repeat`
        bodyElement.style.backgroundSize = 'cover'
        bodyElement.style.backdropFilter = 'blur(3px)'
    } else {
        throw new Error("bodyElement not found")
    }
    audioElement.src = `../sounds/${initialBG}.mp3`
    weatherState = initialBG
    audioElement.play()
}

//Создаем летнюю, осеннюю, зимнюю картинку с погодой
const createSummerWeater = createWeatherImage("../img/summer.png", "summer")
const createAutomWeather = createWeatherImage("../img/autom.png", "autom")
const createWinterWeather = createWeatherImage("../img/winter.png", "winter")

//Добавляем картинки в div id root
rootDiv.appendChild(createSummerWeater)
rootDiv.appendChild(createAutomWeather)
rootDiv.appendChild(createWinterWeather)

//Добавляем элемент аудио и пропуск строки для регулировки громкости от картинок погоды в div id root
const audioBr = document.createElement("br")
rootDiv.append(audioBr)
rootDiv.appendChild(audioSetting)

//Добавляем события по клику на каждую картинку с погодой
createSummerWeater.addEventListener('click', (e) => changeSound(e))
createAutomWeather.addEventListener('click', (e) => changeSound(e))
createWinterWeather.addEventListener('click', (e) => changeSound(e))