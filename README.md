# easySelect
An jQuery  plugin for easy init select or select option value to input name

## example 

```
<!doctype html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta charset="utf-8">
    <title>easy select</title>
    <script src="http://libs.baidu.com/jquery/2.0.0/jquery.min.js"></script>
    <script src="./eqsySelect.js"></script>
</head>

<body>
    openType:<select class="easySelect" name="openType" key="openType" addEmpty="false" val="2"></select>
    <hr>
    openTypeStr:<input class="easySelect" name="openType" key="openType" val="1"/>
</body>
<script>
    $(".easySelect").easySelect({
        url: '/easySelect.json',
        type: 'GET', //the url request type. default is get
        addEmpty: true //default is false . if you set this value is true. then you can see the html body.
    });
</script>
</html>
```
