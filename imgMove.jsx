#target indesign

// Получаем ссылку на текущий документ
var currentDocument = app.activeDocument;

// Определяем путь к файлу картинки, которую мы хотим найти
var targetImagePath = "C:\\Users\\кей\\Documents\\ДОСТОЕВСКИЙ\\Графика\\Достоевский-рука-вниз-1.gif";

// Определяем новые значения ширины и высоты фрейма в пикселях
var newWidth = 22.408; // Замените на желаемую ширину в пикселях
var newHeight = 27.938; // Замените на желаемую высоту в пикселях

// Определяем положение по оси X в пикселях
var positionX1 = 297; // Замените на желаемое положение по оси X в пикселях
var positionX2 = 1632.796;

// Получаем ссылку на все графические элементы в документе
var allGraphics = currentDocument.allGraphics;

// Перебираем все графические элементы
for (var i = 0; i < allGraphics.length; i++) {
  var graphic = allGraphics[i];

  // Проверяем путь к файлу картинки текущего графического элемента
  if (graphic.itemLink && graphic.itemLink.filePath === targetImagePath) {
        var selectedFrame = graphic.parent;

        // Получаем геометрические границы фрейма
        var frameBounds = selectedFrame.geometricBounds;

        // Изменяем размер фрейма
        selectedFrame.geometricBounds = [
          frameBounds[0], // Верхняя граница
          frameBounds[1], // Левая граница
          frameBounds[0] + newHeight, // Нижняя граница
          frameBounds[1] + newWidth // Правая граница
        ];

        // Подгоняем картинку под новый размер фрейма
        graphic.fit(FitOptions.PROPORTIONALLY);
        
        if (graphic.parent.geometricBounds[1] < 274 ) {
            // Сдвигаем фрейм только по оси X
            selectedFrame.move([positionX1, frameBounds[0]]);
      } else if (graphic.parent.geometricBounds[1] > 1606  && graphic.parent.geometricBounds[1] < 1870) {
            selectedFrame.move([positionX2, frameBounds[0]]);
          }
  }
}
