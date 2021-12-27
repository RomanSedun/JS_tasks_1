// 1. Написать рекурсивную функцию возведения в степень. 
// На вход принимать число и его степень, на выходе выдавать рассчитанное значение.

butt.onclick = function() {

    var x = document.getElementById('number').value;
    var y = document.getElementById('degree').value;
    var res = document.getElementById('result1');

    if (x && y) {
        function pow(x, y) {
            if (y == 1) {
              return x;
            } else {
              return x * pow(x, y - 1);
            }
        }
        res.innerHTML = pow(x, y);
        if(res.innerText == "NaN" || res.innerText == "undefined") {
            res.innerHTML = 'Введены неверные данные, попробуйте еще раз';
        }
    }
    else {
        alert("Заполните поля - 'Число' и 'Степень'")
    }
};

// 2. Написать приложение, получающее массив с вложенными массивами 
// и возвращающее его “плоскую” версию. Встроенный метод массивов flat использовать нельзя.
// Например: [1, 2, [3, 4, [5, 6, [7, 8, [9, 10]]]]] => [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

const mass = [1, 2, [3, 4, [5, 6, [7, 8, [9, 10]]]]];
const func = (mass) => {
  const arr1 = [...mass];
  const arr2 = [];
  while (arr1.length) {
    const x = arr1.pop();
    if (Array.isArray(x)) {
        arr1.push(...x);
    } else {
        arr2.push(x);
    }
  }
  return arr2.reverse();
}
document.getElementById('result2').innerHTML = func(mass);


// 3. Требуется создать функцию, получающую на вход число от 0 до 100 000
// и показывающее его текстовый эквивалент.
// Например: 441 => четыреста сорок один

$(document).ready(function(){
    $("input.num").on({
        keydown: function(e) {
          if (e.which === 32)
            return false;
        },
        change: function() {
          this.value = this.value.replace(/\s/g, "");
        }
      });
	$(".num").change(function(){
		var value = $(this).val();
		if(value && /^[0-9]+$/.test(value)){
			$(".result3").html(number_to_string(value));
		}
        else if (!value) {
            $(".result3").html('Поле не должно быть пустым =)');
        }
        else {
            alert("Пожалуйста, используйте только цифры");
        }
	});
});

/** 
 * Возвращает сумму прописью
 */
function number_to_string (num) {
		var def_translite = {
			null: 'ноль',
			a1: ['один','два','три','четыре','пять','шесть','семь','восемь','девять'],
			a2: ['одна','две','три','четыре','пять','шесть','семь','восемь','девять'],
			a10: ['десять','одиннадцать','двенадцать','тринадцать','четырнадцать','пятнадцать','шестнадцать','семнадцать','восемнадцать','девятнадцать'],
			a20: ['двадцать','тридцать','сорок','пятьдесят','шестьдесят','семьдесят','восемьдесят','девяносто'],
			a100: ['сто','двести','триста','четыреста','пятьсот','шестьсот','семьсот','восемьсот','девятьсот'],
			u3: ['тысяча', 'тысячи', 'тысяч'],
		}
	var i1, i2, i3, end, out, fir, v, zeros, _ref, _ref1, _ref2, ax;
	
	_ref = parseFloat(num).toFixed(2).split('.'), fir = _ref[0], end = _ref[1];
	var leading_zeros = 12 - fir.length;
	if (leading_zeros < 0) {
		return false;
	}
	
	var zeros = [];
	while (leading_zeros--) {
		zeros.push('0');
	}
	fir = zeros.join('') + fir;
	var out = [];
	if (fir > 0 && fir <= 100000) {
		// Разбиваем число по три символа
		_ref1 = str_split(fir, 3);
		for (var i = -1; i < _ref1.length;i++) {
			v = _ref1[i];
			if (!(v > 0)) continue;
			_ref2 = str_split(v, 1), i1 = parseInt(_ref2[0]), i2 = parseInt(_ref2[1]), i3 = parseInt(_ref2[2]);
			out.push(def_translite.a100[i1-1]); // 1xx-9xx
			ax = (i+1 == 3) ? 'a2' : 'a1';
			if (i2 > 1) {
				out.push(def_translite.a20[i2-2] + (i3 > 0 ?  ' ' + def_translite[ax][i3-1] : ' ')); // 20-99
			} else {
				out.push(i2 > 0 ? def_translite.a10[i3] : def_translite[ax][i3-1]); // 10-19 | 1-9
			}
			
			if (_ref1.length > i+1){
				var name = def_translite['u'+(i+1)]; 
				out.push(morph(v,name));
			}
		}
	}
    else if (fir > 100000) {
        alert('Пожалуйста, используйте числа до "100000"')
    }
    else {
        out.push(def_translite.null);
	}
	
	// Объединяем маcсив в строку, удаляем лишние пробелы и возвращаем результат
	return out.join(' ').replace(RegExp(' {2,}', 'g'), ' ').trimLeft();
};

/**
 * Склоняем словоформу
 */
function morph(number, titles) {
	var cases = [2, 0, 1, 1, 1, 2];
	return titles[ (number%100>4 && number%100<20)? 2 : cases[Math.min(number%10, 5)] ];
};

/**
 * Преобразует строку в массив 
 */
function str_split(string, length) {
	var chunks, len, pos;
	
	string = (string == null) ? "" : string;
	length =  (length == null) ? 1 : length;
	
	var chunks = [];
	var pos = 0;
	var len = string.length;
	while (pos < len) {
		chunks.push(string.slice(pos, pos += length));
	}
	
	return chunks;
};