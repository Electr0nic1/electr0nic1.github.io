window.addEventListener('DOMContentLoaded', function() {
  
    var UserText = document.getElementById('text-to-work');
    var UserSelectStap = document.getElementById('encrypt-step');
    var UserStep = Number(UserSelectStap.value);
    var result = document.getElementById('output');
    var Encrypt = document.getElementById('encrypt-btn');
    var Decrypt = document.getElementById('decrypt-btn');
    var Reset = document.getElementById('btn-reset');
    var TextToWork;
    var pos;
    
    var OtherSymbols = [' ',',','.',':',';','!','?','-','_','=','+','(',')','[',']','@','`',"'",'"','<','>','|','/','%','$','^','&','*','~'];
    var Numbers = ['0','1','2','3','4','5','6','7','8','9'];
    var RusAlfUp = ['А', 'Б', 'В', 'Г', 'Д', 'Е', 'Ё', 'Ж', 'З', 'И', 'Й', 'К', 'Л', 'М', 'Н', 'О', 'П', 'Р', 'С', 'Т', 'У', 'Ф', 'Х', 'Ц', 'Ч', 'Ш', 'Щ', 'Ъ', 'Ы', 'Ь', 'Э', 'Ю', 'Я'];
    var RusAlfLower = ['а', 'б', 'в', 'г', 'д', 'е', 'ё', 'ж', 'з', 'и', 'й', 'к', 'л', 'м', 'н', 'о', 'п', 'р', 'с', 'т', 'у', 'ф', 'х', 'ц', 'ч', 'ш', 'щ', 'ъ', 'ы', 'ь', 'э', 'ю', 'я'];
    var EngAlfUp = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
    var EngAlfLower = ['a','b','c','d','e','f','g','h','i','j','k','l','m','m','o','p','q','r','s','t','u','v','w','x','y','z'];
    // var UkrAlfUp = ['А','Б','В','Г','Ґ','Д','Е','Є','Ж','З','И','І','Ї','Й','К','Л','М','Н','О','П','Р','С','Т','У','Ф','Х','Ц','Ч','Ш','Щ','Ь','Ю','Я'];
    // var UkrAlfLower = ['а','б','в','г','ґ','д','е','є','ж','з','и','і','ї','й','к','л','м','н','о','п','р','с','т','у','ф','х','ц','ч','ш','щ','ь','ю','я'];
    var RusAlfUpEncrypt = Array(33);
    var RusAlfLowerEncrypt = Array(33);
    var EngAlfUpEncrypt = Array(26); 
    var EngAlfLowerEncrypt = Array(26);
    // var UkrAlfUpEncrypt = Array(33);
    // var UkrAlfLowerEncrypt = Array(33);
    var NumbersEncrypt = Array(10);
    
    initEncrypt();
    
    UserSelectStap.addEventListener('change', function() {
      UserStep = Number(this.value);
      initEncrypt();
    });
    
    function initEncrypt() {
      RusAlfUpEncrypt = CezarEncrypt(UserStep, RusAlfUp);
      RusAlfLowerEncrypt = CezarEncrypt(UserStep, RusAlfLower);
      NumbersEncrypt = CezarEncrypt(UserStep, Numbers);
      EngAlfUpEncrypt = CezarEncrypt(UserStep, EngAlfUp);
      EngAlfLowerEncrypt = CezarEncrypt(UserStep, EngAlfLower);
    }
    // UkrAlfUpEncrypt = CezarEncrypt(3, UkrAlfUp);
    // UkrAlfLowerEncrypt = CezarEncrypt(3, UkrAlfLower);
    
    function CezarEncrypt(stap, arr) {
      var CopyAlf = arr.slice();
      var i = 0;
      
      while ((i + stap) < (CopyAlf.length)) {
        var buff = CopyAlf[i];
        CopyAlf[i] = CopyAlf[i + stap];
        CopyAlf[i + stap] = buff;
        i++;     
      }
      return CopyAlf;
    }
    
    // console.log(RusAlfUp);
    // console.log(RusAlfUpEncrypt);
    // console.log(RusAlfLower);
    // console.log(RusAlfLowerEncrypt);
    
    function contains(symb, arr) {
      var letter = symb;
      pos = 0;
      for (var i = 0; i < arr.length; i++) {
        if (letter === arr[i]) {
          pos = i;
          return true;
          break;
        }
      }
    }
    
    function encrypt(text) {
      var result = '';
      for (var i = 0; i <= text.length; i++) {
        var symbol = text[i];
        if (contains(symbol, OtherSymbols)) {
          result += symbol;
        }
        if (contains(symbol, Numbers)) {
          symbol = NumbersEncrypt[pos];
          result += symbol;
        }
        if (contains(symbol, RusAlfUp)) {
            symbol = RusAlfUpEncrypt[pos];
            result += symbol;
        }
        if ((contains(symbol, RusAlfLower))) {
            symbol = RusAlfLowerEncrypt[pos];
            result += symbol;
        }
        if (contains(symbol, EngAlfUp)) {
            symbol = EngAlfUpEncrypt[pos];
            result += symbol;
        }
        if ((contains(symbol, EngAlfLower))) {
            symbol = EngAlfLowerEncrypt[pos];
            result += symbol;
        }
        // if (contains(symbol, UkrAlfUp)) {
        //     symbol = UkrAlfUpEncrypt[pos];
        //     result += symbol;
        // }
        // if ((contains(symbol, UkrAlfLower))) {
        //     symbol = UkrAlfLowerEncrypt[pos];
        //     result += symbol;
        // }
      }
      return result;
    }
    
    function decrypt(text) {
      var result = '';
      for (var i = 0; i <= text.length; i++) {
        var symbol = text[i];
        if (contains(symbol, OtherSymbols)) {
          result += symbol;
        }
        if (contains(symbol, NumbersEncrypt)) {
          symbol = Numbers[pos];
          result += symbol;
        }
        if (contains(symbol, RusAlfUpEncrypt)) {
            symbol = RusAlfUp[pos];
            result += symbol;
        }
        if ((contains(symbol, RusAlfLowerEncrypt))) {
            symbol = RusAlfLower[pos];
            result += symbol;
        }
        if (contains(symbol, EngAlfUpEncrypt)) {
            symbol = EngAlfUp[pos];
            result += symbol;
        }
        if ((contains(symbol, EngAlfLowerEncrypt))) {
            symbol = EngAlfLower[pos];
            result += symbol;
        }
        // if (contains(symbol, UkrAlfUpEncrypt)) {
        //     symbol = UkrAlfUp[pos];
        //     result += symbol;
        // }
        // if ((contains(symbol, UkrAlfLowerEncrypt))) {
        //     symbol = UkrAlfLower[pos];
        //     result += symbol;
        // }
      }
      return result;
    }
  
    Encrypt.addEventListener('click', function() {
      TextToWork = UserText.value;
      result.value = encrypt(TextToWork);
    });
    Decrypt.addEventListener('click', function() {
      TextToWork = UserText.value;
      result.value = decrypt(TextToWork);
    });
    Reset.addEventListener('click', function() {
      UserText.value = '';
      result.value = '';
    });
    
  });