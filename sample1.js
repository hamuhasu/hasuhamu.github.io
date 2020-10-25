var stock = 0;
$(function () {

    // タイトル押下時BGMが鳴る
    $("#title").click(function () {
        $("#hakugeibgm").get(0).load();
        $("#hakugeibgm").get(0).play();
    })

    var array = [];
    var count = 3;
    var syouri = 0;
    var totalbattle = 0;
    $("#katiCount").text(syouri);

    // ルーレットボタン押下時
    $("#ru-reto").click(function () {
        if (count == 3) {
            switch (siroaikon()) {
                case 1:
                    array.push("白");
                    $("#zerokara").val(array);
                    count = count - 1;
                    break;
                case 2:
                    var kekka = aikon();
                    array.push(kekka);
                    $("#zerokara").val(array);
                    count = count - 2;
                    break;
            }
        }
        else if (count == 2) {
            var kekka = aikon();
            array.push(kekka);
            $("#zerokara").val(array);
            count = count - 1;
        }
        else if (count == 1) {
            var kekka = aikon();
            array.push(kekka);
            $("#zerokara").val(array);
            $("#ru-reto").prop("disabled", true);
            $("#Start").prop("disabled", false);
        }
    })

    // 継続率抽選ボタン押下時
    $("#Start").click(function () {

        $("#Start").prop("disabled", true);

        // 一戦目ボタン活性化
        $("#1push").prop("disabled", false);

        var result = Keizoku();
        $("#keizokuritu").val(result);
    })

    // 一戦目抽選
    $("#1push").click(function () {
        if ($("#keizokuritu").val() != "") {
            var kekka = hiki();
            // 1/32で花は好きが出現
            if (hana() == 1) {
                // 花は好きが再生される
                $("#hantei1").val("花は好き？");
                $("#hanasuki").get(0).load();
                $("#hanasuki").get(0).play();
                $("#hanasuki").show();
                // 再挑戦ボタン活性化
                $("#reset").prop("disabled", false);
                // 勝利数を増やす
                syouri = syouri + 1;
                $("#katiCount").text(syouri);
                // 挑戦数を増やす
                totalbattle = totalbattle + 1;
                $("#allbattle").text(totalbattle);
                // 突破率を表示させる
                $("#syouhai").show();
            }
            // 花は好きが出現しなかった場合
            else {
                // 白鯨ストックがあったら消化
                if (stock == 2) {
                    stock = stock - 1;
                    $("#hantei1").val("撃破アイコン");
                    $("#2push").prop("disabled", false);
                }
                // 白鯨ストックがあったら消化
                else if (stock == 1) {
                    stock = stock - 1;
                    $("#hantei1").val("撃破アイコン");
                    $("#2push").prop("disabled", false);
                }
                else {
                    // 花は好きが出なかったとき、撃破アイコンがなかったとき
                    if ($("#keizokuritu").val() >= kekka) {
                        $("#hantei1").val("一戦目突破");
                        // 二戦目ボタン活性化
                        $("#2push").prop("disabled", false);
                    }
                    else {
                        if (hana() == 4) {
                            $("#hantei1").val("死に戻り");
                            $("#hantei2").val("死に戻り");
                            $("#3push").prop("disabled", false);
                            $("#sinimodori").get(0).load();
                            $("#sinimodori").get(0).play();
                            $("#sinimodori").show();
                        }
                        else {
                            $("#hantei1").val("一戦目敗北");
                            // 再挑戦ボタン活性化
                            $("#reset").prop("disabled", false);
                            // 挑戦数を増やす
                            totalbattle = totalbattle + 1;
                            $("#allbattle").text(totalbattle);
                            // 突破率を表示させる
                            $("#syouhai").show();
                        }
                    }
                }
            }
            $("#1push").prop("disabled", true);
        }
    })

    // 二戦目抽選
    $("#2push").click(function () {
        if ($("#keizokuritu").val() != "") {
            var kekka = hiki();
            // 1/32で花は好きが出現
            if (hana() == 1) {
                // 花は好きが再生される
                $("#hantei2").val("花は好き？");
                $("#hanasuki").get(0).load();
                $("#hanasuki").get(0).play();
                $("#hanasuki").show();
                // 再挑戦ボタン活性化
                $("#reset").prop("disabled", false);
                // 勝利数を増やす
                syouri = syouri + 1;
                $("#katiCount").text(syouri);
                // 挑戦数を増やす
                totalbattle = totalbattle + 1;
                $("#allbattle").text(totalbattle);
                // 突破率を表示させる
                $("#syouhai").show();
            }
            // 花は好きが出現しなかった場合
            else {
                // 白鯨ストックがあったら消化
                if (stock == 1) {
                    stock = stock - 1;
                    $("#hantei2").val("撃破アイコン");
                    // 三戦目ボタン活性化
                    $("#3push").prop("disabled", false);
                }
                // 白鯨ストックがなかった場合、普通の抽選
                else {
                    if ($("#keizokuritu").val() >= kekka) {
                        $("#hantei2").val("二戦目突破");
                        // 三戦目ボタン活性化
                        $("#3push").prop("disabled", false);
                    }
                    else {
                        $("#hantei2").val("二戦目敗北");
                        // 再挑戦ボタン活性化
                        $("#reset").prop("disabled", false);
                        // 挑戦数を増やす
                        totalbattle = totalbattle + 1;
                        $("#allbattle").text(totalbattle);
                        // 突破率を表示させる
                        $("#syouhai").show();
                    }
                }
            }
            // 二戦目ボタン非活性化
            $("#2push").prop("disabled", true);
        }
    })

    // 三戦目抽選
    $("#3push").click(function () {

        // 死に戻りを非表示
        $("#sinimodori").hide();
        $("#sinimodori").get(0).pause();

        if ($("#keizokuritu").val() != "") {
            var kekka = hiki();
            // 1/32で花は好きが出現
            if (hana() == 1) {
                // 花は好きが再生される
                $("#hantei3").val("花は好き？");
                $("#hanasuki").get(0).load();
                $("#hanasuki").get(0).play();
                $("#hanasuki").show();
                // 勝利数を増やす
                syouri = syouri + 1;
                $("#katiCount").text(syouri);
            }
            // 花は好きが出現しなかった場合
            else {
                if ($("#keizokuritu").val() >= kekka) {
                    $("#hantei3").val("三戦目突破");
                    // 勝利動画が再生される
                    $("#victory").get(0).load();
                    $("#victory").get(0).play();
                    $("#victory").show();
                    // 勝利数を増やす
                    syouri = syouri + 1;
                    $("#katiCount").text(syouri);
                }
                else {
                    $("#hantei3").val("三戦目敗北");
                }
            }
            // 再挑戦ボタン活性化
            $("#reset").prop("disabled", false);
            // 三戦目プッシュ非活性化
            $("#3push").prop("disabled", true);
            // 挑戦数を増やす
            totalbattle = totalbattle + 1;
            $("#allbattle").text(totalbattle);
            // 突破率を表示させる
            $("#syouhai").show();
        }
    })

    // 再挑戦押下時
    $("#reset").click(function () {
        // 結果を初期値に戻す
        $("#hakugeibgm").get(0).pause();
        $("#hantei1").val("");
        $("#hantei2").val("");
        $("#hantei3").val("");
        $("#hanasuki").hide();
        $("#hanasuki").get(0).pause();
        $("#victory").hide();
        $("#victory").get(0).pause();
        $("#sinimodori").hide();
        $("#sinimodori").get(0).pause();
        $("#Start").prop("disabled", true);
        $("#1push").prop("disabled", true);
        $("#2push").prop("disabled", true);
        $("#3push").prop("disabled", true);
        $("#zerokara").val("");
        $("#ru-reto").prop("disabled", false);
        $("#keizokuritu").val("");
        $("#reset").prop("disabled", true);
        array = [];
        count = 3;
        stock = 0;
    })

    // 右クリック禁止
    $(function () {
        $('body').on('contextmenu', function (e) {
            return false;
        });
    });

    // F12禁止
    $(document).keydown(function (event) {
        // クリックされたキーのコード
        var keyCode = event.keyCode;

        // ファンクションキーを制御する
        if (keyCode == 123) // F12キーの制御
        {
            return false;
        }
    });
});

// 継続率抽選
var Keizoku = function () {
    var aikonString = $("#zerokara").val();
    var result = aikonString.split(',');
    var countUp = 50;
    for (let i = 0; i < result.length; i++) {
        if (result[i] == "白") {
            countUp = countUp + aikoknloop(33);
        }
        else if (result[i] == "青") {
            countUp = countUp + aikoknloop(50);
        }
        else if (result[i] == "黄") {
            countUp = countUp + aikoknloop(66);
        }
        else if (result[i] == "緑") {
            countUp = countUp + aikoknloop(86);
        }
        else if (result[i] == "撃破") {
            stock = stock + 1;
        }
    }
    return countUp;
}

// 突破するかの抽選
var hiki = function () {
    var min = 1;
    var max = 100;

    var a = Math.floor(Math.random() * (max + 1 - min)) + min;
    return a;
}

// 花は好き（死に戻り）抽選
var hana = function () {
    var min = 1;
    var max = 32;

    var a = Math.floor(Math.random() * (max + 1 - min)) + min;
    return a;
}

// アイコン抽選（文字）
var aikon = function () {
    var result = aikontyuusen();
    if (result > 75) {
        return "撃破";
    }
    else if (result > 62) {
        return "黄";
    }
    else if (result > 15) {
        return "緑";
    }
    else if (result > 0) {
        return "青";
    }
}

// アイコン抽選（数値）
var aikontyuusen = function () {
    var min = 1;
    var max = 100;

    var a = Math.floor(Math.random() * (max + 1 - min)) + min;
    return a;
}

// 白アイコン(数値)
var siroaikon = function () {
    var min = 1;
    var max = 2;

    var a = Math.floor(Math.random() * (max + 1 - min)) + min;
    return a;
}

// アイコンループ
var aikoknloop = function (loop) {
    var one = 1;
    var min = 1;
    var max = 100;
    for (let i = 0; i < 1000; i++) {
        var a = Math.floor(Math.random() * (max + 1 - min)) + min;
        if (a <= loop)
            one = one + 1;
        else {
            return one;
        }
    }
}