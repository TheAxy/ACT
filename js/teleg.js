var button = '<button class="btn btn-primary btn-lg" data-toggle="modal" data-target="#myModal" style="margin-bottom: 1rem;">Оставить заявку</button>';
var modal = '<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true"> <div class="modal-dialog"> <div class="modal-content"> <div class="modal-header"> <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button> <h4 class="modal-title" id="myModalLabel">Оставить заявку</h4> </div><div class="modal-body"><div class="text-center" data-toggle="buttons"><p style="margin:0">Выберите адрес</p><label class="btn btn-primary btn-lg"> <input type="radio" name="office" id="option1" value="1"> г.Барнаул ул.Взлётная 16 </label> <label class="btn btn-primary btn-lg"> <input type="radio" name="office" id="option2" value="2"> г.Барнаул ул.Попова 70 </label> </div><label class="h4" style="margin-top: 1rem;">Ф.И.О.</label> <input type="text" class="form-control" name="name" placeholder="" style="border: 1px solid #ccc; border-radius: 4px;"> <label class="h4" style="margin-top: 1rem;">Телефон</label> <input type="text" class="form-control" name="phone" placeholder="" style="border: 1px solid #ccc; border-radius: 4px;"> <label class="h4" style="margin-top: 1rem;">Описание поломки</label> <textarea class="form-control" name="description" cols="30" rows="10" style="border: 1px solid #ccc; border-radius: 4px;"></textarea> </div><div class="modal-footer hide"> <button type="button" class="btn btn-primary" id="send_zayav" onclick="ym(50995235,\'reachGoal\',\'send_form\')" hiden>Отправить заявку</button> </div></div></div></div>';

$(document).on('ready', function(){
    $('div.price').after(button);
    $('footer').after(modal);
});

$(document).on('click', 'label.btn', function(){
    if($('input[name="office"]:checked').val()){

    } else {
        $('div.modal-footer').removeClass('hide');
        $('div.modal-footer').addClass('show');
    }
});

$(document).on('click', '#send_zayav', function(){
    let office = $('input[name="office"]:checked').val();
    let name = $('input[name="name"]').val();
    let phone = $('input[name="phone"]').val();
    let page = $(document)[0].title;
    let description = $('textarea[name="description"]').val();
    if(office && phone.length >= 4){
        $.ajax({
            type : "POST",
            url : 'http://ats-servis22.ru/lead/telegramm.php',
            data : {
                office : office,
                name : name,
                phone : phone,
                page: page,
                description : description
            },
            success : function() {
                $('#myModal').modal('hide')
            }
        });
    }
})