<!DOCTYPE html>
<html>

<head>
    <title>Oliveira Trust</title>
</head>

<body>
    <img style="width: 250px;" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQltMdFg853JqP5RSFhWb-upZcduMR8LTunyXS6SPm_yuC8ph7gVnT1JDu9rm59i5Z6oA&usqp=CAU" alt="Oliveira Trust Logo">
    <h1>Olá {{ $mailData['user'] }} 👋</h1>
    <p>{{ $mailData['body'] }}</p>

    <table style="text-align:left;">
        <tbody>
            <tr>
                <th>Moeda de origem: </th>
                <td>{{ $mailData['originCurrency'] }}</td>
            </tr>
            <tr>
                <th>Moeda de destino: </th>
                <td>{{ $mailData['destinationCurrency'] }}</td>
            </tr>
            <tr>
                <th>Moeda de destino: </th>
                <td>{{ $mailData['conversionAmount'] }}</td>
            </tr>
            <tr>
                <th>Forma de pagamento: </th>
                <td>{{ $mailData['paymentMethod'] }}</td>
            </tr>
            <tr>
                <th>Valor da moeda de destino usado para conversão: </th>
                <td>{{ $mailData['currencyDestinyValue'] }}</td>
            </tr>
            <tr>
                <th>Valor comprado: </th>
                <td>{{ $mailData['purchaseAmount'] }}</td>
            </tr>
            <tr>
                <th>Taxa de pagamento: </th>
                <td>{{ $mailData['paymentMethodFee'] }}</td>
            </tr>
            <tr>
                <th>Taxa de pagamento: </th>
                <td>{{ $mailData['paymentMethodFee'] }}</td>
            </tr>
            <tr>
                <th>Taxa de conversão: </th>
                <td>{{ $mailData['conversionFee'] }}</td>
            </tr>
            <tr>
                <th>Valor utilizado para conversão descontando as taxas: </th>
                <td>{{ $mailData['conversionWithFee'] }}</td>
            </tr>
        </tbody>
    </table>

    <p>Obrigado !</p>
</body>

</html>
