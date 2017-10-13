/**
 * Created by zhaoyige on 2017/9/26.
 */
var schoolDistrict = [
  {name:'柳东区',val:'0'},
  {name:'柳南区',val:'1'},
  {name:'柳北区',val:'2'},
  {name:'城中区',val:'3'},
  {name:'鱼峰区',val:'4'},
  {name:'柳江区',val:'5'}];
var schoolDate =[
  [{sname:'柳东中心小学',sid:'001'},{sname:'潭中小学',sid:'002'}],
  [{sname:'柳南小学一',sid:'003'},{sname:'柳南小学二',sid:'004'}],
  [{sname:'柳北小学',sid:'004'}],
  [{sname:'城中小学',sid:'005'}],
  [{sname:'鱼峰小学',sid:'006'}],
  [{sname:'柳江小学',sid:'007'}]
];
var frag = '';
var schoolFrag = '';
function createDistrict(){
  return function(){
    frag = '';
    schoolFrag = '';
    for(var i = 0 ; i< schoolDistrict.length ; i++){//生成区县名称DOM节点
      frag += "<li class='modal-section-list' val='"+schoolDistrict[i].val+"'>"+schoolDistrict[i].name+"</li>";
    }
  }
}

var cDistrict = new createDistrict();
$('.modal').on('click','*',function(e){
  e.stopPropagation();
  if(this==$('.close-tier')[0]){ //点击遮罩层其他处关闭遮罩层
    $('.modal').fadeOut(300);
    $('.modal-section').empty();
  };
  if($(this)[0].tagName=="LI"){
    var index = parseInt($(this).attr('val'));
    if(!isNaN(index)){  //学校使用的是sid所以index都为NAN
      for( var j = 0 ; j < schoolDate[index].length; j++){
        schoolFrag +='<li class="modal-section-list" sid="'+schoolDate[index][j].sid+'">'+schoolDate[index][j].sname+'</li>';
      }
    }else{
      var str =encodeURI($(this).text())
      console.log(str)
      window.location.href='login.html?'+str+''
    }
    $('.modal-section').empty();
    $('.modal-section').append(schoolFrag);
  }
}),
    $('.clear-modal').on('click',function(){
      $('.modal').fadeOut(400);
      $('.modal-section').empty();
    })
$('header').load('data/header.php')
$('footer').load('data/footer.php')

$.ready(
    
    $('.js-show-schoolList').on('click',function(){
      $('.modal').fadeIn(400)
      cDistrict()
      $('.modal-section').append(frag);
      $(document).on('touchmove',function (e){
        e.preventDefault();
      });
    }),
    $('.js-tab').on('click','a',function(){
      $(this).addClass('active').siblings().removeClass('active');
      $($(this).attr('href')).addClass('active').siblings().removeClass('active');
    })
)

$('.clear-btn').on('click',function(){
  ($('#notice').is(':checked'))&&$('.modal').fadeOut(400)
})
