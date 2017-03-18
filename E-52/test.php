<html>
<head>
<script language="javascript">
        function verif()
        {
        return confirm('are you sure ..........?');
        }
</script>
</head>
<body>
<?php
        echo'<form action="test.php" method="post" onsubmit="return verif();">';
        echo'<input type="text" name="md"/>';
        echo'<input type="submit" name="submit" value="MD"/>';
        echo'</form>';
        if ($_POST['submit']==true){echo"ok";}
?>
</body>
</html>
