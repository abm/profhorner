var PH = PH || {};

(function(PH) {
    PH.lcm = 42254912700;
    var lengths = {"Judges":21,"Micah":7,"Proverbs":31,"Romans":16,"Deuteronomy":34,"Haggai":2,"3 John":1,"Matthew":28,"1 Kings":22,"Mark":16,"1 Peter":5,"1 Thessalonians":5,"Daniel":14,"Malachi":3,"1 Timothy":6,"Colossians":4,"Ruth":4,"Genesis":50,"2 Samuel":24,"Obadiah":1,"Esther":16,"Exodus":40,"Jeremiah":52,"Ephesians":6,"Habakkuk":3,"Luke":24,"Song of Solomon":8,"Jonah":4,"Acts":28,"Job":42,"Titus":3,"2 Timothy":4,"James":5,"2 John":1,"Isaiah":66,"2 Thessalonians":3,"1 Chronicles":29,"Leviticus":27,"Revelation":22,"Psalms":150,"Zephaniah":3,"Joel":4,"Nahum":3,"Jude":1,"2 Chronicles":36,"Hosea":14,"Zechariah":14,"Nehemiah":13,"John":21,"1 John":5,"Lamentations":5,"Amos":9,"1 Samuel":31,"Joshua":24,"1 Corinthians":16,"Ezra":10,"2 Corinthians":13,"Hebrews":13,"Ezekiel":48,"2 Peter":3,"Philippians":4,"Numbers":36,"Philemon":1,"Galatians":6,"2 Kings":25,"Ecclesiastes":12};
    var totalLengths = [89,187,78,65,62,150,31,255,252,28];
    var plan = [
        ["Matthew", "Mark", "Luke", "John"],
        ["Genesis", "Exodus", "Leviticus", "Numbers", "Deuteronomy"],
        ["Romans", "1 Corinthians", "2 Corinthians", "Galatians", "Ephesians", "Philippians", "Colossians", "Hebrews"],
        ["1 Thessalonians", "2 Thessalonians", "1 Timothy", "2 Timothy", "Titus", "Philemon", "James", "1 Peter", "2 Peter", "1 John", "2 John", "3 John", "Jude", "Revelation"],
        ["Job", "Ecclesiastes", "Song of Solomon"],
        ["Psalms"],
        ["Proverbs"],
        ["Joshua", "Judges", "Ruth", "1 Samuel", "2 Samuel", "1 Kings", "2 Kings", "1 Chronicles", "2 Chronicles", "Ezra", "Nehemiah", "Esther"],
        ["Isaiah", "Jeremiah", "Lamentations", "Ezekiel", "Daniel", "Hosea", "Joel", "Amos", "Obadiah", "Jonah", "Micah", "Nahum", "Habakkuk", "Zephaniah", "Haggai", "Zechariah", "Malachi"],
        ["Acts"]
    ];
    var bookAndChapter = function(index, group) {
        var bookIndex = 0;
        var bookLength = lengths[group[bookIndex]];
        while (index > bookLength) {
            index -= bookLength;
            bookLength = lengths[group[++bookIndex]];
        };
        return { "book": group[bookIndex], "chapter": index };
    };
    PH.getReadingPlan = function(date) {
        date.setHours(0,0,0,0); // set to midnight
        index = Math.floor(date / 86400000) % PH.lcm;
        var indexes = totalLengths.map(function(length) { return index > length ? index % length || 1 : index; });
        var books = _.map(indexes, function(index, i) { return bookAndChapter(index, plan[i]); });
        return books;
    };
})(PH);
