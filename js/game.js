$(function(){
		// var all_poker = [];				//测试用 记得注释掉
		var all_poker = Array('14_0','15_1');// 生成牌组数据,其中最先定义好大王和小王牌的数据
		// 三位玩家的初始牌组
		var play_1 = Array();	//左边玩家牌组
		var play_2 = Array();	//中边玩家牌组
		var play_3 = Array();	//右边玩家牌组
		var click = 0;			//游戏开始开关变量
		var animated = false;	//动画展示开始变量
		function gameLoad(){
			var value = sessionStorage.getItem("key");
			if(value == null){
				value = 500;
			}
			$(".scoreContent span").html(value);
			//牌组点数总数据生成
			for (var i = 1; i <= 13; i++) {
				for (var j = 0; j <=3 ; j++) {
					all_poker[all_poker.length] = i+'_'+j;
				}
			}
			//提前定义好三位玩家的牌								//测试用 记得注释掉
			// var test1 = ["1_0","2_0","3_0","4_2","5_2","1_1","1_2","2_1","2_2","3_1","3_2","12_0","12_1","12_2","12_3","14_0","15_1","13_1"];
			// var test2 = ["1_3","2_3","3_3","4_3","5_3","6_3","11_0","11_1","11_2","11_3","7_1","7_2","7_3","8_1","8_2","8_3","13_3","13_2"];
			// var test3 = ["6_0","7_0","8_0","9_0","10_0","4_0","4_1","5_0","5_1","6_0","6_1","9_0","9_1","9_2","10_0","10_1","10_2","13_0"];
			// for(var i = 0;i <= 17;i++){
			// 	all_poker.push(test1[i]);
			// 	all_poker.push(test2[i]);
			// 	all_poker.push(test3[i]);
			// }
			// 一、生成初始牌组
			for(var i = 0; i<54; i++){
				$('.mid_top .all_poker').append('<li class="back"></li>');
				$('.all_poker li:last').css({
					top:-(i/4)+'px',			//给点牌组重叠感觉
					left:-(i/4)+'px'			//给点牌组重叠感觉
				});
			}
		}
		gameLoad();
		$("#soundControl").on("click",function(){
			var video = document.getElementById("startVideo");
			var music = document.getElementById("bgmusic"); 
			if(music.paused && video.paused){
	            music.play();
	            $(".sound").removeClass("sound_pause");
	            $(".sound").addClass("sound_play");
	        }else{
	            music.pause();
	            $(".sound").removeClass("sound_play");
	            $(".sound").addClass("sound_pause");
	        }
		})
		$("#videoControl").on("click",function(){
			var music = document.getElementById("bgmusic"); 
			music.pause();
			var video = document.getElementById("startVideo");
			console.log(video);
			if(video.paused){
				$("#startVideo").css("display","block");
				video.play();
			}else{
				$("#startVideo").css("display","none");
				video.pause();
				music.play();
			}
			var aud = document.getElementById("startVideo");
			aud.onended = function() {
				$("#startVideo").css("display","none");
				music.play();
			};
		})

		$('body').on('click', '.all_poker li', function(){
			var music = document.getElementById("bgmusic"); 
			var video = document.getElementById("startVideo");
			if(video.paused){
				music.play();
			}
			if (click == 0) {
				click++;
				clearPoker();	//执行洗牌				
				sound(xp);

				// click++;										//洗牌关闭直接开始	//测试用
				// start();
				// sound(fp);
				// setTimeout(function(){qdz()},3500);
				// animated = false;

				//打乱牌组顺序
				all_poker = all_poker.sort(function(x,y){
					return Math.random() - 0.5;
				});
			}
		});
		
		//洗牌函数
		var poker_html;
		function clearPoker(){
			animated = true;
			// 先保存原牌组的HTML代码
			poker_html = $('.mid_top').html();
			// 1、删除原牌组
			$('.mid_top ul').remove();
			var ul = '';
			ul += '<ul class="all_poker" style="left:0px">';
			for (var i = 1; i <=54; i++) {
				ul += '<li class="back" style="left:0"></li>'
			}
			ul += '</ul>';
			$('.mid_top').append(ul);
			var p = 54;
			var anim3 = setInterval(function(){
				$('.all_poker li').eq(p).css({
					'left':-p*10+200+'px',
					'transform-origin': '0px,0px',
					'transition':'0.5s'
				});
				p--;
				if (p<0) {
					clearInterval(anim3);
				}
			},50)
			setTimeout(function(){
				p = 54;
				var anim1 = setInterval(function(){
					$('.all_poker li').eq(p).css({
						'transform':'rotate(1800deg) translateX(400px) ',
						'transform-origin': '0px,0px',
						'transition':'6s'
					});
					p--;
					if (p<0) {
						clearInterval(anim1);
					}
				},50)
			},3000)
			setTimeout(function(){
				p = 54;
				var anim1 = setInterval(function(){
					$('.all_poker li').eq(p).css({
						'transform':'translateX(0px) ',
						'transform-origin': '0px,0px',
						'transition':'2s'
					});
					p--;
					if (p<0) {
						clearInterval(anim1);
					}
				},50)
			},9000)
			//等动画效果完毕后再执行恢复到原来的样子
			setTimeout(function(){
				click++;
				start();
				sound(fp);
				setTimeout(function(){qdz()},3500);
				animated = false;
			},12000);
		}
		//抢地主之前的给牌play_4函数
		function qdz_pre(){
			$('.mid_top').html(poker_html);
			$('.mid_top ul').eq(0).remove();
		}
		//开始发牌函数
		function start(){
			var i = 0;
			var m = 0;
			var int = setInterval(function(){
				//发牌给左边玩家
				setTimeout(function(){
					$('.all_poker li:last').animate({top:'200px',left:'-500px'},20);
					setTimeout(function(){
						$('.all_poker li:last').remove()
					},250)
					play_1.push(all_poker[m++]);			//左边玩家牌组++
					var poker_html = makeAIPoker()				//AI牌生成
					$('.play_1').append(poker_html);
					$('.play_1 li:last').css({top:30*(i+1)+'px'})
				},30)
				//发牌给中间玩家
				setTimeout(function(){
					$('.all_poker li:last').animate({top:'400px'},20);
					setTimeout(function(){
						$('.all_poker li:last').remove();
					},250)
					play_2.push(all_poker[m++]);			//中间玩家牌组++
					var poker_html = makePoker(play_2[play_2.length-1])							
					$('.play_2').append(poker_html);
					$('.play_2 li:last').css({left:20*i+'px'})
					$('.play_2').css({left:-10*i+'px'})
				},60);
				//发牌给右边玩家
				setTimeout(function(){
					$('.all_poker li:last').animate({top:'200px',left:'500px'},20);
					setTimeout(function(){
						$('.all_poker li:last').remove()
					},250)
					play_3.push(all_poker[m++]);	//右边玩家牌组++
					var poker_html = makeAIPoker()		//AI牌生成
					$('.play_3').append(poker_html);			
					$('.play_3 li:last').css({top:30*(i+1)+'px'})
				},90)
				i++;
				if (i >= 17) {
					clearInterval(int);
					//先得到已经重新整理好的三个玩家牌组数据
					setTimeout(function(){
						play_1 = getsort(play_1);
						play_2 = getsort(play_2);
						play_3 = getsort(play_3);
						$('.play_2 li').css({'background':''}).attr('class','back');
						//等0.5秒之后重新生成排序好的牌
						setTimeout(function(){
							//先删除2号玩家的牌
							$('.play_2 li').remove();
							for (var i = 0; i < play_1.length; i++) {
								//生成2号玩家的牌
								var poker_html_2 = makePoker(play_2[i])
								$('.play_2').append(poker_html_2);
								$('.play_2 li:last').css({left:20*i+'px'})
								$('.play_2').css({left:-10*i+'px'})
							}
						},500)
					},1000)
				}
			},100);
		}

		//======================================================================================================
		//牌面生成
		function makePoker(data){
			var data = data;
			var poker_arr = data.split('_');
			var arr = Array(
				Array(-43, -222),	//方块
				Array(-43, -47),	//梅花
				Array(-158, -47),	//红桃
				Array(-158, -222)	//黑桃
			);		//保存各花色的坐标
			if (poker_arr[0] != 14&&poker_arr[0] != 15) {
				var x = arr[poker_arr[1]][0];	
				var y = arr[poker_arr[1]][1];
			}else{
				if (poker_arr[1] == 0) {
					var x = -158;
					var y =-46;
				}else{
					var x = -43;
					var y = -46;
				}
			}
			var poker_html = '<li data="'+data+'"; style="width: 100px; height: 138px;  background: url(./images/'+poker_arr[0]+'.png) '+x+'px '+y+'px;"></li>'
			return poker_html;
		}
		//======================================================================================================
		function makeAIPoker(){
			var poker_html = '<li class="back"></li>'
			return poker_html;
		}
		//排序函数
		function getsort(data_arr){
			data_arr.sort(function(x,y){
				var x_arr = x.split('_');	//使用_字符分割，x_arr[0]=>点数，x_arr[1]=>花色
				var y_arr = y.split('_');	//使用_字符分割，y_arr[0]=>点数，y_arr[1]=>花色
				if (x_arr[0] != y_arr[0]) {		//如果两张牌点数不相等
					return y_arr[0]-x_arr[0];	//返回负值，不动，正值，调换
				}else{
					return y_arr[1]-x_arr[1];	//否则相等的话使用花色进行排序
				}
			});
			return data_arr;
		}
		// 抢地主函数
		var dizhuNumber = null;
		function qdz() {
			dizhuNumber = 0;
			// 先随机谁开始抢地主
			var landlordNum = Math.round(Math.random()*2)
			// var landlordNum = 1;												/////////////////////////////////测试用设置一开始随机到谁
			var landlordPassNum = 0;
			$('.qdz').eq(landlordNum).css({'display':'block'});
			//抢地主音效	
			AIqdzClock(landlordNum,landlordPassNum);
		}
		//AI自动抢地主
		function AIqdz(index){
			var aiPokerNum = Array();
			if(index == 1){
				var aiPoker = play_1;
			}else if(index == 2){
				var aiPoker = play_2;
			}else{
				var aiPoker = play_3;
			}
			for(var i = 0;i <= aiPoker.length-1; i++){
				var aiPokerData = aiPoker[i].split("_");
				aiPokerNum.push(aiPokerData[0])
			}
			var judgeQdz = Array();
			for(var i = 0; i <= aiPokerNum.length-1; i++){
				if(aiPokerNum[i] == 14 || aiPokerNum[i] == 15 || aiPokerNum[i] == 13 || aiPokerNum[i] == 12){
					judgeQdz.push(aiPokerNum[i])
				}
			}
			var judgeNum1 = 0;
			var judgeNum2 = 0;
			var judgeNum3 = 0;
			for(var i = 0; i <= judgeQdz.length-1 ; i++){
				if(judgeQdz[i] == 15 || judgeQdz[i] == 14){
					judgeNum1++;
				}else if(judgeQdz[i] == 13){
					judgeNum2++;
				}else if(judgeQdz[i] == 12){
					judgeNum3++;
				}
			}
			if(judgeNum1 >= 2 || judgeNum2 >= 3 || judgeNum1 >= 1 && judgeNum2 >= 2 || judgeNum3 >= 4){
				return 1;
			}else{
				return 0;
			}
		}
		//判断AI抢地主
		function judgePlayerQdz(v,landlordNum,landlordPassNum){
			if(v == 1){
				sound(qdz_yes);     //抢地主
			}else{
				sound(qdz_no);      //不抢
			}
			if ( v > 0 ) {	//大于0 有人抢了地主
				dizhuNumber = landlordNum + 1;
				console.log(play_1);
				console.log(play_3);
				$(".scoreFrame").css({"display":"block"})//积分版显示
				qdz_pre();
				LastThree();			//生成三张地主牌牌函数
				setTimeout(function(){		//分牌给抢到地主的人
					$('.qdz').css({'display':'none'});
					$('.rank').css({'display':'block'});
					$('.rank').eq(landlordNum).html('地主');		//名字改为地主
					$('.rank').eq(landlordNum).addClass("rank_1");						//等级修改为地主，改头像
					if ( landlordNum==0 ) {							//左边的人抢到地主
						var poker_html = '<li class="back"></li>'
						for(var i = 0; i <= 2 ; i++){
							$('.play_1').append(poker_html);
							$('.play_1 li:last').css({top:30*(i+18)+'px'})
							play_1.push(all_poker[i+51]);//把三张牌放进左边玩家数组中
							play_1 = getsort(play_1);
						}
					}
					if ( landlordNum==1 ) {	//中间的人抢到地主
						$('.play_2').append(a1);
						$('.play_2 li:last').css({left:20*18+'px'})
						$('.play_2').css({left:-10*18+'px'})
						$('.play_2').append(a2);
						$('.play_2 li:last').css({left:20*19+'px'})
						$('.play_2').css({left:-10*19+'px'})
						$('.play_2').append(a3);
						$('.play_2 li:last').css({left:20*20+'px'})
						$('.play_2').css({left:-10*20+'px'})
						play_2.push(all_poker[51]);		//把三张牌放进中间玩家数组中
						play_2.push(all_poker[52]);
						play_2.push(all_poker[53]);
						setTimeout(function(){
							play_2 = getsort(play_2);
							$('.play_2 li').remove();
							for (var i = 0; i < play_2.length; i++) {
								// 重新生成2号玩家的牌
								var poker_html_2 = makePoker(play_2[i])
								$('.play_2').append(poker_html_2);
								$('.play_2 li:last').css({left:20*i+'px'})
								$('.play_2').css({left:-10*i+'px'})
							}
							//抢地主后才能开始出牌函数
						},500)
					}
					if ( landlordNum==2 ) {					//右边的人抢到地主
						var poker_html = '<li class="back"></li>'
						for(var i = 0; i <= 2 ; i++){
							$('.play_3').append(poker_html);
							$('.play_3 li:last').css({top:30*(i+18)+'px'})
							play_3.push(all_poker[i+51]);	//把三张牌放进左边玩家数组中
							play_3 = getsort(play_3);
						}
					}
				},500)	//地主牌生成需要400毫秒，所以要等500毫秒才地主牌给玩家
				setTimeout(function(){
					startGame(landlordNum); //开始游戏
				},1000)
				return v;
			}else{		
				//否则继续下一个抢
				landlordPassNum++;
				if ( landlordPassNum<3 ) {		//还有人没抢完
					$('.play_'+(landlordNum+1)+'~.clock').hide();
					landlordNum = (++landlordNum>2)?0:landlordNum;
					AIqdzClock(landlordNum,landlordPassNum);
					$('.qdz').css({'display':'none'});
					$('.qdz').eq(landlordNum).css({'display':'block'});
				}else{
					$('#tishi').css('display','block');
					$('.play_'+landlordNum+'~.clock').hide();
					$('#tishi h6').html('没有人抢地主，点我本局重新开始');
					$('body').on('click','#ok',function(){
						var url = window.location.href;		//重新刷新页面
						window.location.href = url;
					})
				}
			}
		}
		function AIqdzClock(landlordNum,landlordPassNum){
			//绑定抢地主方法
			var index = landlordNum+1;
			$('.play_'+index+'~.clock').show();
			//先开启计时器
			if(index != 2){	//AI时间改成3秒
				var n = 3;
				$('.play_'+index+'~.clock').html(3);
				$('body').off('click', '.mid_end input')//解绑
			}else{
				var n = 30;
				$('.play_'+index+'~.clock').html(30);
				$('body').on('click', '.mid_end .qdz input', function(){//改成只绑定玩家2就好了
					var v = $(this).attr("data-value");
					$('.play_'+index+'~.clock').hide();
					clearInterval(int);
					judgePlayerQdz(v,landlordNum,landlordPassNum);
				})
			}
			var int = setInterval(function(){
				var n = Number($('.play_'+index+'~.clock').html());
				$('.play_'+index+'~.clock').html(--n);
				if ( n <= 0 ) {
					$('.play_'+index+'~.clock').hide();
					clearInterval(int);
					//======================================================================================
					//时间到零，自动pass
					//检测牌桌上是否有牌，有就直接pass，没就自动出最小的牌
					var v = AIqdz();
					judgePlayerQdz(v,landlordNum,landlordPassNum);
				}
			},1000)
		}
		//点击按钮，把提示div消失
		$('.content').on('click','#ok',function(){
			$('#tishi').css('display','none');	
		});
		function refreshPlaying(){
			$('body').on('click','#ok',function(){
				var value = $(".scoreContent span").html();
				if(play_2.length == 0){
					value = parseInt(value) + 50;
				}else{
					var victory = $('#tishi h6').html()
					if(victory == '地主赢了！点击再来一把'){
						value = value - 50;
					}else{
						value = parseInt(value) + 50;
					}
				}
				sessionStorage.setItem("key", value);
				var url = window.location.href;		//重新刷新页面
				window.location.href = url;
			})
		}
		//最后三张牌函数
		var a1;
		var a2;
		var a3;
		var play_4 = Array();	//地主三张牌数组
		function LastThree(){
			$('.all_poker li').eq(2).animate({left:'-200px'},300);	//最后三张牌背面动画往左	
			$('.all_poker li').eq(1).animate({left:'200px'},300);	//最后三张牌背面动画往右	
			setTimeout(function(){
				//最后三张牌背面删了			
				$('.all_poker').remove();
			},400)
			setTimeout(function(){
				play_4.push(all_poker[51]);
				var poker_html = makePoker(play_4[play_4.length-1]);
				a1 = makePoker(play_4[play_4.length-1]);			//用变量a1保存生成的第一张地主牌
				$('.play_4').append(poker_html);
				$('.play_4 li:last').css({left:-200+'px',top:-100+'px'});
			},400)
			setTimeout(function(){
				play_4.push(all_poker[52]);
				var poker_html = makePoker(play_4[play_4.length-1]);
				a2 = makePoker(play_4[play_4.length-1]);			//用变量a2保存生成的第二张地主牌
				$('.play_4').append(poker_html);
			
				$('.play_4 li:last').css({left:0+'px',top:-100+'px'});
			},400)
			setTimeout(function(){
				play_4.push(all_poker[53]);
				var poker_html = makePoker(play_4[play_4.length-1]);
				a3 = makePoker(play_4[play_4.length-1]);			//用变量a3保存生成的第三张地主牌
				$('.play_4').append(poker_html);
				
				$('.play_4 li:last').css({left:200+'px',top:-100+'px'});
			},400)
			setTimeout(function(){
				$('.play_4 li').css({'width':'50px;'})
			},1000);
		}	
		//出牌动画函数
		function move() {
			$('body').on('click','.play_2 li', function(){	//只绑定玩家2的牌
				var select = $(this).attr('class');
				if (select == 'select') {	//如果牌已经选中了，就弹下去
					$(this).attr('class','');
					var data = $(this).attr('data');
					for (var i = 0; i < temp_poker.length; i++) {
						if (temp_poker[i] == data) {	//删除对应选中的牌数据
							temp_poker.splice(i,1);
							break;
						}
					}
				}else{	
					//如果牌没选中，就弹上去
					$(this).attr('class','select');
					var data = $(this).attr('data');
					temp_poker.push(data);
				}
			})
		}
		
		//开始打牌函数
		var now_poker = Array();	//场上目前扑克	 
		/*
		内含五个值 
		0.场上牌堆数组
		1.牌型
		2.牌型最大值
		3.炸弹类型
		4.身份
		*/
		var temp_poker = Array();	//传输玩家牌组数据的数组
		var temp_poker_type = 0;
		var pass = 1;				//pass的次数
		function startGame( index ){
			var index = index+1;
			if(index == 1){
				var this_player = play_1;
			}else if(index == 2){
				move();		//只有在轮到玩家2的时候才绑定出牌
				var this_player = play_2;
			}else{
				var this_player = play_3;
			}
			$('body p').eq(0).html('剩余'+parseInt(play_1.length)+'张');
			$('body p').eq(1).html('剩余'+parseInt(play_2.length)+'张');
			$('body p').eq(2).html('剩余'+parseInt(play_3.length)+'张');
			//绑定打牌玩家可以点击牌的事件函数
			$('.play_'+index+'~.clock').show();
			$('.play_'+index+'~.play').show();
			$('.play_'+index+'~.pass').show();
			//先开启计时器
			if(index != 2){		//AI时间改成3秒
				var n = 3;
				$('.play_'+index+'~.clock').html(3);
			}else{
				var n = 30;
				$('.play_'+index+'~.clock').html(30);
			}
			var int = setInterval(function(){
				var n = Number($('.play_'+index+'~.clock').html());
				$('.play_'+index+'~.clock').html(--n);
				if (n == 5 && index == 2) {//玩家2才会花都谢语音
					sound(huadouxiele);
				}
				if ( n <= 0 ) {
					$('.play_'+index+'~.clock').hide();
					clearInterval(int);
					//======================================================================================
					//时间到零，自动pass
					//检测牌桌上是否有牌，有就直接pass，没就自动出最小的牌
					if(now_poker.length == 0){	
						aiAuto(index);//Ai自动出最小的牌
						playCard(index,int);
					}else{
						if(index == 2){					//需要恢复回自己时间到自动过牌												
							passCard(index,int);
						}else{
							var satisfy = aiPlayer(index);//自动分析牌型出牌出牌
							if(satisfy){
								console.log(temp_poker);
								playCard(index,int);//打得过
							}else{
								passCard(index,int);//打不过就PASS;
							}
						}
					}
				}
			},1000)
			//清除默认的右键事件并且重新绑定右键出牌
			if(index == 2){
				$(document).contextmenu('body', function(e){
					 e.preventDefault();
				});
				$('body').bind('mousedown',function(e){
					if(e.button == 2){//右键
	                	$('.play_2~.play').trigger("click");	
	               }
				});
			}
			//================================出牌点击按钮==============================================================		
			$('body').on('click','.play_2~.play', function(){
				playCard(index,int);
			});
			//================================PASS按钮==================================================================
			$('body').on('click','.play_2~.pass', function(){
				passCard(index,int);
			});
		}
		function playCard(index,int){
			//对出牌进行检测
			var temp_arr = checkPokers(temp_poker);			//调用检查牌型
			if (!temp_arr) {
				$('#tishi').css('display','block');
				$('#tishi h6').html('你确定斗地主能这样出？')
			}else{
				temp_poker_type = temp_arr[1];
				var vs_result = checkVS(temp_arr,now_poker);	//判断牌面大小牌型
				if (!vs_result) {
					$('#tishi').css('display','block');
					$('#tishi h6').html('你再好好看看自己出了什么鬼！');
					return false;
				}else{
					//说明能打出去
					pass = 1;	
					/*
					由于temp_poker到的后会清空或者换成别的样子，而这的now_poker需要把值固定下来，所以不能使用引用赋值的方法来进行直接赋值，要用复制赋值。
					*/
					sound_play(temp_arr)	//出牌音效
					var images_src = images_name(temp_arr)
					images(images_src)		//出牌特效
					now_poker = Array();
					now_poker[0] = Array();
					for (var i = 0; i < temp_poker.length; i++) {
						now_poker[0].push(temp_poker[i]);
					}
					now_poker[1] = temp_arr[1];			//牌型存储
					now_poker[2] = temp_arr[2];			//保存关键值
					if (temp_arr[2] == 998) {				//如果是炸弹，还要保存多一个是什么炸弹
						now_poker[3] = temp_arr[3];
					}else{
						now_poker[3] = "";
					}
					now_poker[4] = $('.rank').eq(index-1).html();
					//关计时器
					clearInterval(int);
					// 解除原来绑定的事件
					clickOff();
					$('body').unbind('mousedown');				//解除右键出牌的绑定事件
					//==================================================================================
					//判断第几个玩家出牌，出牌的上上个玩家的牌被清空
					if(index == 1){
						$('.now_poker_2 li').remove();
					}else if(index == 2){
						$('.now_poker_3 li').remove();
					}else if(index == 3){
						$('.now_poker_1 li').remove();
					}
					//让玩家的牌出到对应的位置
					for (var i = 0; i < now_poker[0].length; i++) {
						var li = makePoker(now_poker[0][i]);
						$('.now_poker_'+index).append(li);
						$('.now_poker_'+index+' li:last').css({left:20*i+'px'})
					}
					//===================================删除牌型开关===============================================
					switch(index){
						case 1:
							play_1 = delPoker(play_1,temp_poker);	//删除牌型
							btnHide(index);
							$('.play_1 li').remove();
							baodanAndbaoshuang(play_1)
							if (play_1.length == 0) {
								judgeResult(dizhuNumber,index);
								refreshPlaying();				//重新刷新页面
								clearInterval(int);
								return 0;
							}
							// temp_poker = Array();
							for (var i = 0; i < play_1.length; i++) {
								// 重新生成1号玩家的牌
								var poker_html_1 = makeAIPoker()
								$('.play_1').append(poker_html_1);		
								$('.play_1 li:last').css({top:30*(i+1)+'px'})
							}
							startGame(index);						//递归调用开始打牌函数
						break;
						case 2:
							play_2 = delPoker(play_2,temp_poker);
							btnHide(index);
							$('.play_2 li').remove();
							baodanAndbaoshuang(play_2)
							if (play_2.length == 0) {
								judgeResult(dizhuNumber,index);
								refreshPlaying();	//重新刷新页面
								$('body').on('click','#ok',function(){
									var url = window.location.href;		
									window.location.href = url;
								})
								clearInterval(int);
								return 0;
							}
							for (var i = 0; i < play_2.length; i++) {
								// 重新生成1号玩家的牌
								var poker_html_1 = makePoker(play_2[i])
								$('.play_2').append(poker_html_1);		
								$('.play_2 li:last').css({left:20*i+'px'})
								$('.play_2').css({left:-10*i+'px'})
							}
							startGame(index);					//递归调用开始打牌函数
						break;
						case 3:
							play_3 = delPoker(play_3,temp_poker);
							btnHide(index);
							$('.play_3 li').remove();
							baodanAndbaoshuang(play_3)
							if (play_3.length == 0) {
								judgeResult(dizhuNumber,index);
								refreshPlaying();	//重新刷新页面
								clearInterval(int);
								return 0;
							}
							for (var i = 0; i < play_3.length; i++) {
								// 重新生成3号玩家的牌
								var poker_html_3 = makeAIPoker()
								$('.play_3').append(poker_html_3);		
								$('.play_3 li:last').css({top:30*(i+1)+'px'})
							}
							index = 0;		 //返回左边出牌的玩家出牌
							startGame(index);	//递归调用开始打牌函数
						break;
					}
				}
			}
		}
		function passCard(index,int){
			if (now_poker.length == 0) {
				$('#tishi').css('display','block');
				
				$('#tishi h6').html('到你出还不出牌？你想什么');
				return 1;
			}
			sound(cp_no); 				//播发PASS音效
			//点击pass，所有被选中的牌会被取消选中
			for(var i=0; i<21; i++){
				var select = $('.play_'+index+' li').eq(i).attr('class');
				if (select == 'select') {				//如果牌已经选中了，就弹下去
					$('.play_'+index+' li').eq(i).attr('class','');
					temp_poker.splice(0,1);
				}
			}
			pass+=1;
			//点击pass，上上个玩家的牌也会消失
			if(index == 1){
				$('.now_poker_2 li').remove();
			}else if(index == 2){
				$('.now_poker_3 li').remove();
			}else if(index == 3){
				$('.now_poker_1 li').remove();
			}
			if (pass > 2) {
				pass = 1;
				now_poker = Array();	//pass两次，清空台面所有牌
				$('.now_poker_1 li').remove();
				$('.now_poker_2 li').remove();
				$('.now_poker_3 li').remove();		
			}
			clearInterval(int);
			clickOff();
			btnHide(index);
			if ( index==3 ) {
				index = 0;
			}
			startGame(index);	//继续游戏下一个玩家出牌
		}
		//判断结果
		function judgeResult(dizhuNumber,index){
			if(dizhuNumber == index){
				$('#tishi').css('display','block');
				
				$('#tishi h6').html('地主赢了！点击再来一把')
			}else{
				$('#tishi').css('display','block');
				
				$('#tishi h6').html('农民赢了！点击再来一把');
			}
		}
		function baodanAndbaoshuang(player){
			if (player.length == 1) {
				sound(baodan);
			}
			if (player.length == 2) {
				sound(baoshuang);
			}
		}
		//接触按钮绑定
		function clickOff(){
			$('body').off('click','.play_2~.play');
			$('body').off('click','.play_2 li');
			$('body').off('click','.play_2~.pass');
		}
		//按钮隐藏
		function btnHide(index){
			$('.play_'+index+'~.clock').hide();
			$('.play_'+index+'~.play').hide();
			$('.play_'+index+'~.pass').hide();
		}
		//自动选中最小的牌
		function aiAuto( index ){						//还要修改这个函数 自动会出其他牌型和下家报单的时候不能出单张
			var myRank = $('.rank').eq(index-1).html();	//明确自己身份
			if(index == 1){
				var aiPoker = play_1;
				var nextPlayerPoker = play_2;
				var nextPlayerRank = $('.rank').eq(1).html();
			}else if(index == 2){
				var aiPoker = play_2;
				var nextPlayerPoker = play_3;
				var nextPlayerRank = $('.rank').eq(2).html();
			}else if(index == 3){
				var aiPoker = play_3;
				var nextPlayerPoker = play_1;
				var nextPlayerRank = $('.rank').eq(0).html();
			}
			var aiPokerNum = Array();		//牌编号
			//分离提取牌型数据
			for(var i = 0;i <= aiPoker.length-1; i++){
				var aiPokerData = aiPoker[i].split("_");
				aiPokerNum.push(aiPokerData[0])
			}
			if(myRank == nextPlayerRank && nextPlayerPoker.length == 1){				//下家剩一个牌并且是一个阵容的时候
				temp_poker.push(aiPoker[aiPoker.length-1]);								//打出最小放你过
			}else if(myRank == nextPlayerRank && nextPlayerPoker.length == 2){			//下家剩2张并且是一个阵容
				for(var i = aiPokerNum.length-1 ; i >= 0 ; i--){						//打出一个对子放你过
					if(aiPokerNum[i] == aiPokerNum[i-1]){
						temp_poker.push(aiPoker[i]);
						temp_poker.push(aiPoker[i-1]);
						return true
					}
				}
				autoRoutine(aiPoker);													//没有对子的话继续按常规出牌
			}else if(myRank != nextPlayerRank && nextPlayerPoker.length == 1){			//下家剩一个牌并且不是一个阵容的时候
				for(var i = aiPokerNum.length-1 ; i >= 0 ; i--){						//优先出对子
					if(aiPokerNum[i] == aiPokerNum[i-1]){
						temp_poker.push(aiPoker[i]);
						temp_poker.push(aiPoker[i-1]);
						return true
					}
				}
				temp_poker.push(aiPoker[0]);					//没有对子的话要顶大，0为最大的牌
			}else{
				autoRoutine(aiPoker);
			}
		}
		//常规自动出牌
		function autoRoutine(aiPoker){						
			var aiPokerNum = Array();		//牌编号
			//分离提取牌型数据
			for(var i = 0;i <= aiPoker.length-1; i++){
				var aiPokerData = aiPoker[i].split("_");
				aiPokerNum.push(aiPokerData[0])
			}
			if(aiPokerNum[aiPokerNum.length-1] == aiPokerNum[aiPokerNum.length-2] && aiPokerNum[aiPokerNum.length-2] == aiPokerNum[aiPokerNum.length-3]){
				temp_poker.push(aiPoker[aiPokerNum.length-1]);
				temp_poker.push(aiPoker[aiPokerNum.length-2]);
				temp_poker.push(aiPoker[aiPokerNum.length-3]);
				for(var i = aiPokerNum.length-1 ; i >= 0 ; i--){
					if(aiPokerNum[i] != aiPokerNum[aiPokerNum.length-1]){
						temp_poker.push(aiPoker[i]);
						return true;
					}	
				}
			}else if(aiPokerNum[aiPokerNum.length-1] == aiPokerNum[aiPokerNum.length-2]){
				temp_poker.push(aiPoker[aiPokerNum.length-1]);
				temp_poker.push(aiPoker[aiPokerNum.length-2]);
				return true;
			}else{
				temp_poker = [];
				temp_poker.push(aiPoker[aiPoker.length-1]);
				return true;
			}
		}
		//AI压牌
		function aiPlayer(index){									
			var aiPokerNum = Array();		//牌编号
			var myRank = $('.rank').eq(index-1).html();		//明确自己身份
			if(index == 1){
				var aiPoker = play_1;
			}else if(index == 2){
				var aiPoker = play_2;
			}else if(index == 3){
				var aiPoker = play_3;
			}
			//分离提取牌型数据
			for(var i = 0;i <= aiPoker.length-1; i++){
				var aiPokerData = aiPoker[i].split("_");
				aiPokerNum.push(aiPokerData[0])
			}
			//先判断牌型   再判断大小   再判断身份
			if(now_poker[1] == 1){											//单张
				if(aiPoker == play_1){
					var nextPlayerPoker = play_2;
					var nextPlayerRank = $('.rank').eq(1).html();
				}else if(aiPoker == play_2){
					var nextPlayerPoker = play_3;
					var nextPlayerRank = $('.rank').eq(2).html();
				}else if(aiPoker == play_3){
					var nextPlayerPoker = play_1;
					var nextPlayerRank = $('.rank').eq(0).html();
				}
				if(myRank != nextPlayerRank && nextPlayerPoker.length == 1){	//单张的时候要进行顶大，只要不是一个阵营
					console.log(myRank+"--"+nextPlayerRank+"--"+nextPlayerPoker.length);
					if(aiPokerNum[0] > now_poker[2]){							//并且能打过
						temp_poker.push(aiPoker[0]);
						return true;
					}else{
						return false;
					}
				}else{									//否则按常规出牌
					return judgeRank(myRank,AI_dan,aiPokerNum,aiPoker)
				}
			}else if(now_poker[1] == 2){									//对子
				return judgeRank(myRank,AI_duizi,aiPokerNum,aiPoker)
			}else if(now_poker[1] == 3){											//三条
				return judgeRank(myRank,AI_san,aiPokerNum,aiPoker)
			}else if(now_poker[1] == 4){											//三带一
				return judgeRank(myRank,AI_sandaiyi,aiPokerNum,aiPoker)					
			}else if(now_poker[1] == 5){											//三带二
				return judgeRank(myRank,AI_sandaier,aiPokerNum,aiPoker)
			}else if(now_poker[1] == 6 || now_poker[1] == 10 ||now_poker[1] == 11 ||	//顺子
				     now_poker[1] == 12 ||now_poker[1] == 16 ||now_poker[1] == 18 ||
				     now_poker[1] == 21 ||now_poker[1] == 22){
				return judgeRank(myRank,AI_shunzi,aiPokerNum,aiPoker)
			}else if(now_poker[1] == 9 || now_poker[1] == 13 ||now_poker[1] == 19 ||	//连对
				     now_poker[1] == 23 ||now_poker[1] == 26 ||now_poker[1] == 29 ||
				     now_poker[1] == 31 ||now_poker[1] == 32){
				return judgeRank(myRank,AI_liandui,aiPokerNum,aiPoker)
			}else if(now_poker[1] == 6 || now_poker[1] == 8 ||now_poker[1] == 24 ||	    //三顺
				     now_poker[1] == 27){
				return judgeRank(myRank,AI_sanshun,aiPokerNum,aiPoker)
			}else if(now_poker[1] == 14 || now_poker[1] == 25 ||now_poker[1] == 30){	//带单飞机
				return judgeRank(myRank,AI_feijidaidan,aiPokerNum,aiPoker)
			}else if(now_poker[1] == 998){
				return judgeRank(myRank,AI_BoomVsBoom,aiPokerNum,aiPoker)
			}
		}
		//判断压牌类型以及判断牌型及判断牌型大小
		function judgeRank(myRank,Fun,aiPokerNum,aiPoker){
			// console.log(myRank+"--"+now_poker[4]+"出的牌")
			if(now_poker[2] >= 9){				//大于等于J的时候
				if(myRank == now_poker[4]){		//判断阵营，如果同队就不出牌
					return false
				}else{
					return Fun(aiPokerNum,aiPoker);
				}
			}else{
				if(myRank == now_poker[4] && now_poker[1] >= 3){		//判断阵营，如果同队或者出三带1以上牌型就不出牌
					return false
				}else{
					return Fun(aiPokerNum,aiPoker);
				}
			}
		}
		//检索单张
		function AI_dan(aiPokerNum,aiPoker,myRank){									
			for(var i = aiPokerNum.length-1; i >= 0; i--){
				if(aiPokerNum[i] > now_poker[2]){
					temp_poker.push(aiPoker[i]);
					return true
				}
			}
			return checkBoomAndSupBoom(aiPokerNum,aiPoker,myRank);
		}
		//检索对子
		function AI_duizi(aiPokerNum,aiPoker,myRank){
			for(var i = aiPokerNum.length-1 ; i >= 0 ; i--){
				if(aiPokerNum[i] > now_poker[2] && aiPokerNum[i] == aiPokerNum[i-1]){
					temp_poker.push(aiPoker[i]);
					temp_poker.push(aiPoker[i-1]);
					return true
				}
			}
			return checkBoomAndSupBoom(aiPokerNum,aiPoker,myRank);
		}
		//检索三张
		function AI_san(aiPokerNum,aiPoker,myRank){
			for(var i = aiPokerNum.length-1 ; i >= 0 ; i--){
				if(aiPokerNum[i] > now_poker[2] && aiPokerNum[i] == aiPokerNum[i-1] && aiPokerNum[i-1] == aiPokerNum[i-2]){
					temp_poker.push(aiPoker[i]);
					temp_poker.push(aiPoker[i-1]);
					temp_poker.push(aiPoker[i-2]);
					return true
				}
			}
			return checkBoomAndSupBoom(aiPokerNum,aiPoker,myRank);
		}
		//检索三带一
		function AI_sandaiyi(aiPokerNum,aiPoker,myRank){
			for(var i = aiPokerNum.length-1 ; i >= 0 ; i--){
				if(aiPokerNum[i] > now_poker[2] && aiPokerNum[i] == aiPokerNum[i-1] && aiPokerNum[i-1] == aiPokerNum[i-2]){
					temp_poker.push(aiPoker[i]);
					temp_poker.push(aiPoker[i-1]);
					temp_poker.push(aiPoker[i-2]);
					for(var j = aiPokerNum.length-1 ; j >= 0 ; j--){
						if(aiPokerNum[j] != aiPokerNum[j-1] && temp_poker.indexOf(aiPoker[j]) == -1){
							temp_poker.push(aiPoker[j]);
							return true
						}
					}
				}
			}
			return checkBoomAndSupBoom(aiPokerNum,aiPoker,myRank);
		}
		//检索三带二
		function AI_sandaier(aiPokerNum,aiPoker,myRank){
			for(var i = aiPokerNum.length-1 ; i >= 0 ; i--){
				if(aiPokerNum[i] > now_poker[2] && aiPokerNum[i] == aiPokerNum[i-1] && aiPokerNum[i-1] == aiPokerNum[i-2]){
					temp_poker.push(aiPoker[i]);
					temp_poker.push(aiPoker[i-1]);
					temp_poker.push(aiPoker[i-2]);
					for(var j = aiPokerNum.length-1 ; j >= 0 ; j--){
						if(aiPokerNum[j] == aiPokerNum[j-1] && temp_poker.indexOf(aiPoker[j]) == -1){
							temp_poker.push(aiPoker[j]);
							temp_poker.push(aiPoker[j-1]);
							console.log(temp_poker);
							return true
						}
					}
				}
			}
			return checkBoomAndSupBoom(aiPokerNum,aiPoker,myRank);
		}
		//检索顺子
		function AI_shunzi(aiPokerNum,aiPoker,myRank){
			for(var i = aiPokerNum.length-1 ; i >= 0 ; i--){
				temp_poker = [];
				temp_poker.push(aiPoker[i])
				var firstNum = aiPokerNum[i];
				for(var j = aiPokerNum.length-1 ; j >= 0 ; j--){
					if(firstNum == parseInt(aiPokerNum[j])-1 && aiPokerNum[j] <= 12){
						temp_poker.push(aiPoker[j]);
						if(temp_poker.length == now_poker[0].length && aiPokerNum[j] > now_poker[2]){
							return true;
						}else{
							firstNum++;
						}
					}
				}
			}
			temp_poker = [];
			return checkBoomAndSupBoom(aiPokerNum,aiPoker,myRank);
		}
		//检索连对
		function AI_liandui(aiPokerNum,aiPoker,myRank){
			for(var i = aiPokerNum.length-1 ; i >= 0 ; i--){
				temp_poker = [];
				temp_poker.push(aiPoker[i])
				var firstNum = aiPokerNum[i];
				for(var j = aiPokerNum.length-1 ; j >= 0 ; j--){
					if(firstNum == parseInt(aiPokerNum[j]) && aiPokerNum[j] <= 13 && i != j){
						temp_poker.push(aiPoker[j]);
						console.log(temp_poker);
						if(temp_poker.length == now_poker[0].length){
							if(aiPokerNum[j] > now_poker[2]){
								console.log(temp_poker);
								return true;
							}
						}else if(temp_poker.length % 2 == 0){
							firstNum++;
						}
					}
				}
			}
			temp_poker = [];
			return checkBoomAndSupBoom(aiPokerNum,aiPoker,myRank);
		}
		//检索三顺
		function AI_sanshun(aiPokerNum,aiPoker,myRank){
			for(var i = aiPokerNum.length-1 ; i >= 0 ; i--){
				temp_poker = [];
				temp_poker.push(aiPoker[i])
				var firstNum = aiPokerNum[i];
				for(var j = aiPokerNum.length-1 ; j >= 0 ; j--){
					if(firstNum == parseInt(aiPokerNum[j]) && aiPokerNum[j] <= 13){
						temp_poker.push(aiPoker[j]);
						if(temp_poker.length == now_poker[0].length && aiPokerNum[j] > now_poker[2]){
							return true;
						}else if(temp_poker.length % 3 == 0){
							firstNum++;
						}
					}
				}
			}
			temp_poker = [];
			return checkBoomAndSupBoom(aiPokerNum,aiPoker,myRank);
		}
		//检索飞机带单
		function AI_feijidaidan(aiPokerNum,aiPoker,myRank){
			for(var i = aiPokerNum.length-1 ; i >= 0 ; i--){
				temp_poker = [];
				temp_poker.push(aiPoker[i])
				var firstNum = aiPokerNum[i];
				for(var j = aiPokerNum.length-2 ; j >= 0 ; j--){
					//如果点数相等并且点数是2以下的牌
					if(firstNum == parseInt(aiPokerNum[j]) && aiPokerNum[j] <= 13){
						temp_poker.push(aiPoker[j]);
						//先添加三顺
						if(temp_poker.length % 3 == 0){
							firstNum++;
						}
						//三顺数量满足后开始添加单排
						if(temp_poker.length / 3 * 1 + temp_poker.length == now_poker[0].length){
							for(var k = aiPokerNum.length-1 ; k >= 0 ; k--){
								// 	//检索添加的牌不是三顺取走的牌
								if(temp_poker.indexOf(aiPoker[k]) == -1){
									temp_poker.push(aiPoker[k]);
									//当牌数相等并且最大值比较大的时候
									if(temp_poker.length == now_poker[0].length && aiPokerNum[j] > now_poker[2]){
										return true;
									}
								}
							}
						}
					}
				}
			}
			temp_poker = [];
			return checkBoomAndSupBoom(aiPokerNum,aiPoker,myRank);
		}
		//炸弹压炸弹
		function AI_BoomVsBoom(aiPokerNum,aiPoker,myRank){
			for(var i = aiPokerNum.length-1; i >= 0 ; i--){
				if(aiPokerNum[i] == aiPokerNum[i-1] && aiPokerNum[i-1] == aiPokerNum[i-2] && aiPokerNum[i-2] == aiPokerNum[i-3]){
					if(aiPokerNum[i-3] > now_poker[3]){
						temp_poker.push(aiPoker[i]);
						temp_poker.push(aiPoker[i-1]);
						temp_poker.push(aiPoker[i-2]);
						temp_poker.push(aiPoker[i-3]);
						return true;
					}
				}
			}
			return checkSupBoom(aiPokerNum,aiPoker);
			// return false;
		}
		//检索炸弹
		function checkBoom(aiPokerNum,aiPoker){
			for(var i = aiPokerNum.length-1; i >= 0 ; i--){
				if(aiPokerNum[i] == aiPokerNum[i-1] && aiPokerNum[i-1] == aiPokerNum[i-2] && aiPokerNum[i-2] == aiPokerNum[i-3]){
					temp_poker.push(aiPoker[i]);
					temp_poker.push(aiPoker[i-1]);
					temp_poker.push(aiPoker[i-2]);
					temp_poker.push(aiPoker[i-3]);
					return true;
				}
			}
			return false;
		}
		//检索皇炸
		function checkSupBoom(aiPokerNum,aiPoker){
			if(aiPokerNum[0] == 15 && aiPokerNum[1] == 14){
				temp_poker.push(aiPoker[0]);
				temp_poker.push(aiPoker[1]);
				return true;
			}
			return false;
		}
		//检索皇炸和炸弹
		function checkBoomAndSupBoom(aiPokerNum,aiPoker,myRank){
			var boom = checkBoom(aiPokerNum,aiPoker);
			var supBoom = checkSupBoom(aiPokerNum,aiPoker);
			if(boom && supBoom){
				temp_poker.splice(temp_poker.length-1);
				temp_poker.splice(temp_poker.length-1);
				console.log(temp_poker);
			}
			if(boom || supBoom && myRank != now_poker[4]){
				if(boom){
					return boom;
				}else{
					return supBoom;
				}
			}
			return false;
		}
		/*检查出牌规则
		参数poker_arr   array
		return false or Array
		牌型不正确返回false
		牌型正确返回数组，数组中包含已经排序的原参数数组，与牌型类型
		可以在原数组中加入新元素为判断值，该判断就是同牌型下用进行比较大小的值
		1: 单排
		2: 对子
		3: 3条
		4: 3带1
		5: 5张 3带2
		6: 5张 顺子
		7: 6张 4带2
		8: 6张 2*3 飞机
		9: 6张 连对
		10: 6张 顺子
		11: 7张 顺子
		12: 8张 顺子
		13: 8张 连对
		14: 8张 飞机
		15: 8张 4带2对
		16: 9张 顺子
		17: 9张 3*3飞机
		18: 10张 顺子
		19：10张 连对
		20: 10张 3带2大飞机
		21: 11张 顺子
		22: 12张 顺子
		23: 12张 连对 
		24: 12张 4*3飞机
		25: 12张 3带1小飞机
		26: 14张 连对
		27: 15张 5*3飞机
		28: 15张 3*3带2大飞机
		29: 16张 连对
		30: 16张 4*3带1小飞机
		31: 18张 连对
		32: 20张 连对
		33: 20张 4*3带2大飞机
		998普通炸
		999王炸
		
		*/
		function checkPokers( poker_arr ) {
			if ( poker_arr.length == 0 ) {			//代表不出
				return false;
			}else if ( poker_arr.length == 1 ) {	//判断是出单张
				var temp = Array();
				sort(temp,poker_arr);
				var key = parseInt(temp[0]);
				var data = Array(
					poker_arr,
					1,
					key
					);
					return data;	
			}else if ( poker_arr.length == 2 ){		//判断是出两张
				var temp = Array();
				sort(temp,poker_arr);
				if ( temp[0] == 14 && temp[1] == 15||temp[0] == 15 && temp[1] == 14) {
					poker_arr = getsort(temp);		//对牌进行排序
					var data = Array(				//王炸
						poker_arr,
						999,
						999
						);
					return data;
				}else if ( temp[1] == temp[0] ) {
					var key = parseInt(temp[0]);
					poker_arr = getsort(temp);		//对牌进行排序
					var data = Array(				//对子
						poker_arr,
						2,
						key
						);
					return data;
				}else{
					return false;
				}
			}else if ( poker_arr.length == 3 ) {	//判断是出三张
				var temp = Array();
				sort(temp,poker_arr);
				if (temp[0] == temp[1] && temp[1] == temp[2]) {
					var key = parseInt(temp[0]);
					poker_arr = getsort(temp);		//对牌进行排序
					var data = Array(				//3条
						poker_arr,
						3,
						key
						);
					return data;
				}
			}else if ( poker_arr.length == 4 ){		//判断是出四张
				var temp = Array();
				sort(temp,poker_arr);
				if ( temp[0] == temp[1] && temp[1] == temp[2] && temp[2] == temp[3]) {		//判断为炸弹
					var key = parseInt(temp[0]);
					poker_arr = getsort(temp);		//对牌进行排序
					var data = Array(				//普通炸
						poker_arr,
						998,						//炸弹牌型
						998,						//炸弹比较其他牌型的值
						key				    		//炸弹与炸弹比较的值
						);
					return data;
				}else if (temp[0] == temp[1] && temp[1] == temp[2] ||temp[1] == temp[2] && temp[2] == temp[3]) {	//判断牌型为3带1
					if (temp[0] == temp[1] && temp[1] == temp[2]) {
						var key = parseInt(temp[0]);
						poker_arr = getsort(temp);		//对牌进行排序
						var data = Array(				//3带1
							poker_arr,
							4,
							key
							);
						return data;
					}else if(temp[1] == temp[2] && temp[2] == temp[3]) {
						var key = parseInt(temp[1]);
						poker_arr = getsort(temp);		//对牌进行排序
						var data = Array(				//3带1
							poker_arr,
							4,
							key
							);
						return data;
					}
				}else{
					return false;
				}
			}else if ( poker_arr.length == 5 ) {	//判断是出五张
				var temp = Array();
				sort(temp,poker_arr);
				if (temp[0]==temp[1]&&temp[1]==temp[2]&&temp[3]==temp[4]||temp[0]==temp[1]&&temp[2]==temp[3]&&temp[3]==temp[4]) {
					if (temp[0]==temp[1]&&temp[1]==temp[2]&&temp[3]==temp[4]) {
						var key = parseInt(temp[0]);
						poker_arr = getsort(temp);		//对牌进行排序
						var data = Array(				//3带2
							poker_arr,
							5,
							key
							);
						return data;
					}else if (temp[0]==temp[1]&&temp[2]==temp[3]&&temp[3]==temp[4]) {
						var key = parseInt(temp[2]);
						poker_arr = getsort(temp);		//对牌进行排序
						var data = Array(				//3带2
							poker_arr,
							5,
							key
							);
						return data;
					}
				}else{
					//判断顺子的方法
					var res = shunzi(temp);
					if (res) {
						var key = parseInt(res);
						poker_arr = getsort(temp);	 //对牌进行排序
						var data = Array(			 //5张的顺子
							poker_arr,
							6,
							key
							);
						return data;
					}else{
						return false;
					}
				}
			}else if ( poker_arr.length == 6 ) {	  //判断是出六张
				var temp = Array();
				sort(temp,poker_arr);				//提取点数并且排序函数
				var res = true;
				var case1 = true;
				var case2 = true;
				var case3 = true;
				for (var i = 0; i<3; i++) {			//判断前4张是否一样
					if (temp[i] != temp[i+1]) {
						case1 = false;
					}
					if (temp[i+1] != temp[i+2]) {
						case2 = false;
					}
					if (temp[i+2] != temp[i+3]) {
						case3 = false;
					}
				}
				if (case1) {
					var res = temp[0]; 
				}
				if (case2) {
					var res = temp[1]; 
				}
				if (case3) {
					var res = temp[2];
				}
				// var res = (case1||case2||case3)?true:false;
				if (case1||case2||case3) {
					var key = parseInt(res);
					poker_arr = getsort(temp);		//对牌进行排序
					var data = Array(				//4带2
						poker_arr,
						7,
						key
						);
					return data;
				}else if( parseInt(temp[0])+1 == temp[5]&&temp[0]!=13&&temp[5]!=13){
					var key =  parseInt(temp[0]);
					poker_arr = getsort(temp);	   //对牌进行排序
					var data = Array(			   //6张不带的小飞机
						poker_arr,
						8,
						key
						);
					return data;
				}else{
					var res1 = liandui(temp);
					var res2 = shunzi(temp);
					if (res1) {
						var key = parseInt(res1);
						poker_arr = getsort(temp);		//对牌进行排序
						var data = Array(				//6张的连对
							poker_arr,
							9,
							key
							);
						return data;
					}else if (res2) {
						var key = parseInt(res2);
						poker_arr = getsort(temp);		//对牌进行排序
						var data = Array(				//6张的顺子
							poker_arr,
							10,
							key
							);
						return data;
					}else{
						return false;
					}
				}
			}else if ( poker_arr.length == 7 ) {		//判断是出七张
				var temp = Array();
				sort(temp,poker_arr);
				var res = shunzi(temp);
				if (res) {
					var key = parseInt(res);
					poker_arr = getsort(temp);		//对牌进行排序
					var data = Array(				//7张顺子
						poker_arr,
						11,
						key
						);
					return data;
				}else{
					return false;
				}
			}else if (poker_arr.length == 8 ) {
				var temp = Array();
				sort(temp,poker_arr);
				var res1 = liandui(temp);
				var res2 = shunzi(temp);
				var res3 = feijidai8(temp);
				var res4 = FourWithTwo(temp);
				if (res2) {
					var key = parseInt(res2);
					poker_arr = getsort(temp);		//对牌进行排序
					var data = Array(				//8张顺子
						poker_arr,
						12,
						key
						);
					return data;
				}else if(res1){
					var key = parseInt(res1);
					poker_arr = getsort(temp);		//对牌进行排序
					var data = Array(				//8张连对
						poker_arr,
						13,
						key
						);
					return data;
				}else if(res3) {
					var key = parseInt(res3);
					poker_arr = getsort(temp);		//对牌进行排序
					var data = Array(				//8张的飞机
						poker_arr,
						14,
						key
						);
					return data;
				}else if (res4) {
					var key = parseInt(res4)
					poker_arr = getsort(temp);		//对牌进行排序
					var data = Array(				//4带2
						poker_arr,
						15,
						key
						);
					return data;
				}else{
					return false;
				}
			}else if (poker_arr.length == 9 ) {
				var temp = Array();
				sort(temp,poker_arr);
				var res = shunzi(temp);
				var res1 = feijibudai(temp);
				if (res) {
					var key = parseInt(res);
					poker_arr = getsort(temp);		//对牌进行排序
					var data = Array(				//9张顺子
						poker_arr,
						16,
						key
						);
					return data;
				}else if (res1) {
					poker_arr = getsort(temp);		//对牌进行排序
					var data = Array(				//9张不带的飞机
						poker_arr,
						17
						);
					return data;
				}else{
					return false;
				}
			}else if (poker_arr.length == 10 ) {
				var temp = Array();
				sort(temp,poker_arr);
				var res1 = liandui(temp);
				var res2 = shunzi(temp);
				var res3 = feiji10(temp);
				if (res2) {
					var key = parseInt(res2);
					poker_arr = getsort(temp);		//对牌进行排序
					var data = Array(				//10张顺子
						poker_arr,
						18,
						key
						);
					return data;
				}else if (res1) {
					var key = parseInt(res1);
					poker_arr = getsort(temp);		//对牌进行排序
					var data = Array(				//10张连对
						poker_arr,
						19,
						key
						);
					return data;
				}else if (res3) {
					var key = parseInt(res3);
					poker_arr = getsort(temp);		//对牌进行排序
					var data = Array(				//10张3*2+2*2大飞机
						poker_arr,
						20,
						key
						);
					return data;
				}else{
					return false;
				}
			}else if (poker_arr.length == 11 ) {
				var temp = Array();
				sort(temp,poker_arr);
				var res = shunzi(temp);
				if (res) {
					var key = parseInt(res);
					poker_arr = getsort(temp);		//对牌进行排序
					var data = Array(				//11张顺子
						poker_arr,
						21,
						key
						);
					return data;
				}else{
					return false;
				}
			}else if (poker_arr.length == 12 ){
				var temp = Array();
				sort(temp,poker_arr);
				var res = shunzi(temp);
				var res1 = liandui(temp);
				var res2 = feijibudai(temp);
				var res3 = feijidai12(temp);		//12张3*3+3*1飞机判断
				if (res) {
					var key = parseInt(res);
					poker_arr = getsort(temp);		//对牌进行排序
					var data = Array(				//12张顺子
						poker_arr,
						22,
						key
						);
					return data;
				}else if (res1) {
					var key = parseInt(res1);
					poker_arr = getsort(temp);		//对牌进行排序
					var data = Array(				//12张连对
						poker_arr,
						23,
						key
						);
					return data;
				}else if (res2) {
					var key = parseInt(res2);
					poker_arr = getsort(temp);		//对牌进行排序
					var data = Array(				//12张飞机不带
						poker_arr,
						24,
						key
						);
					return data;
				}else if (res3) {
					var key = parseInt(res3);
					poker_arr = getsort(temp);		//对牌进行排序
					var data = Array(				//12张3*3+3*1飞机
						poker_arr,
						25,
						key
						);
					return data;
				}else{
					return false;
				}
			}else if (poker_arr.length == 14 ){
				var temp = Array();
				sort(temp,poker_arr);
				var res = liandui(temp);
				if (res) {
					var key = parseInt(res);
					poker_arr = getsort(temp);		//对牌进行排序
					var data = Array(				//14张连对
						poker_arr,
						26,
						key
						);
					return data;
				}else{
					return false;
				}
			}else if (poker_arr.length == 15 ){
				var temp = Array();
				sort(temp,poker_arr);
				var res = feijibudai(temp);
				var res1 = feiji15(temp);
				if (res) {
					var key = parseInt(res);
					poker_arr = getsort(temp);		//对牌进行排序
					var data = Array(				//15张不带的飞机
						poker_arr,
						27,
						key
						);
					return data;
				}else if(res1) {
					var key = parseInt(res1);
					poker_arr = getsort(temp);		//对牌进行排序
					var data = Array(				//15张3*3+2*3的飞机
						poker_arr,
						28,
						key
						);
					return data;
				} else{
					return false;
				}
			}else if (poker_arr.length == 16 ){
				var temp = Array();
				sort(temp,poker_arr);
				var res = liandui(temp);
				if (res) {
					var key = parseInt(res);
					poker_arr = getsort(temp);		//对牌进行排序
					var data = Array(				//16张连对
						poker_arr,
						29,
						key
						);
					return data;
				}
			}else if (poker_arr.length == 18 ){
				var temp = Array();
				sort(temp,poker_arr);
				var res = liandui(temp);
				if (res) {
					var key = parseInt(res);
					poker_arr = getsort(temp);		//对牌进行排序
					var data = Array(				//18张连对
						poker_arr,
						31,
						key
						);
					return data;
				}
			}else if (poker_arr.length == 20 ){
				var temp = Array();
				sort(temp,poker_arr);
				var res = liandui(temp);
				if (res) {
					var key = parseInt(res);
					poker_arr = getsort(temp);		//对牌进行排序
					var data = Array(				//20张连对
						poker_arr,
						32,
						key
						);
					return data;
				}
			}
		}
		//提取点数并且排序函数
		function sort(temp,poker_arr){
			for (var i = 0; i < poker_arr.length; i++) {
				var arr = poker_arr[i].split('_');
				temp.push(arr[0]);
			}
			temp.sort(function(x,y){
				return x-y;
			})
		}
		//判断顺子函数
		function shunzi(temp) {
			var res = true;
			for (var i = 0; i < temp.length; i++) {
				if (temp[i]==13) {
					res = false;
					return res;
				}
			}
			for (var i = 0; i < temp.length-1; i++) {
				if (parseInt(temp[i])+1 != parseInt(temp[i+1])) {
					res = false;	
					break;
				}else{
					res = parseInt(temp[temp.length-1]);
				}
			}
			return res;
		}
		//判断连对函数
		function liandui(temp) {
			var res;
			var res1;
			var res2;
			for (var i = 0; i < temp.length-1; i++) {
				if (temp[i]==13) {						//不能是2
					res = false
					return res;
				}
			}
			for (var i = 0; i <temp.length-2; i+=2) {	
				if (parseInt(temp[i])+1 != parseInt(temp[i+2])) { //用来判断是不是成对
					res1 = false;
					break;
				}else{
					res1 = true;
				}
			}
			for (var i = 0; i <temp.length; i+=2) {	//用来判断是不是连号
				if (temp[i]!=temp[i+1]) {
					res2 = false;
					break;
				}else{
					res2 = true;
				}
			}
			if (res1==true&&res2==true) {	//同时满足2个条件
				res = parseInt(temp[temp.length-1]);
			}else{
				res = false;
			}
			return res;
		}
		//判断8张的飞机函数
		function feijidai8(temp) {
			var res = false;
			for (var i = 0; i < 3; i++) {									//8张飞机有3种情况
				if (temp[i]==temp[i+1]&&temp[i+1]==temp[i+2]&&temp[i]!=13&&		//前三张相等并且没有2
					temp[i+3]==temp[i+4]&&temp[i+4]==temp[i+5]&&temp[i+3]!=13&&		//后三张相等并且没有2
					parseInt(temp[i])+1==temp[i+5]) 								//6张连牌第一张+1等于最后一张
				{
					res = parseInt(temp[i+5]);
					break;
				}
			}
			return res;
		}
		//12张带的飞机
		function feijidai12(temp) {
			var res = false;
			for (var i = 0; i < 4; i++) {								//12张3*3+3*1的飞机有4种情况
				if (temp[i]==temp[i+1]&&temp[i+1]==temp[i+2]&&temp[i]!=13&&		//前3张相等并且没有2
					temp[i+3]==temp[i+4]&&temp[i+4]==temp[i+5]&&temp[i+3]!=13&& //中3张相等并且没有2
					temp[i+6]==temp[i+7]&&temp[i+7]==temp[i+8]&&temp[i+6]!=13&&	   //后3张相等并且没有2
					parseInt(temp[i])+1==temp[i+5]&&
					parseInt(temp[i+5])+1==temp[i+8]) {
					res = parseInt(temp[i+8]);
					break;
				}
			}
			return res;
		}
		//判断4带2函数
		function FourWithTwo(temp) {
			var res = false;
			if (temp[0]==temp[1]&&temp[1]==temp[2]&&temp[2]==temp[3]&&temp[4]==temp[5]&&temp[6]==temp[7]) {
				res = parseInt(temp[0]);
			}
			if (temp[0]==temp[1]&&temp[2]==temp[3]&&temp[3]==temp[4]&&temp[4]==temp[5]&&temp[6]==temp[7]) {
				res = parseInt(temp[2]);
			}
			if (temp[0]==temp[1]&&temp[2]==temp[3]&&temp[4]==temp[5]&&temp[5]==temp[6]&&temp[6]==temp[7]) {
				res = parseInt(temp[4]);
			}
			return res;
		}
		//9,12,15张不带的飞机
		function feijibudai(temp) {
			var res = false;
			var res1 = true;
			var res2 = true;
			for (var j = 0; j <= temp.length-1; j++) {
				if (temp[j]==13) {
					return res;
				}
			}
			for (var i = 0; i < 2; i++) {
				if (temp.length==9) {
					if (temp[i]!=temp[i+1]&&temp[i+3]!=temp[i+4]&&temp[i+6]!=temp[i+7]) {
						res1 = false;
						break;
					}
				}else if (temp.length==12) {
					if (temp[i]!=temp[i+1]&&temp[i+3]!=temp[i+4]&&temp[i+6]!=temp[i+7]&&temp[i+9]!=temp[i+10]) {
						res1 = false;
						break;
					}
				}else if (temp.length==15) {
					if (temp[i]!=temp[i+1]&&temp[i+3]!=temp[i+4]&&temp[i+6]!=temp[i+7]&&temp[i+9]!=temp[i+10]&&temp[12]!=temp[13]) {
						res1 = false;
						break;
					}
				}
			}
			for (var i = 0; i < temp.length-5; i+=3) {
				if (parseInt(temp[i])+1!=temp[i+3]) {
					res2 = false;
					break
				}
			}
			if (res1==true&&res2==true) {
				res = parseInt(temp[temp.length-1])
			}
			return res;
		}
		//10张3带2飞机
		function feiji10(temp) {
			var res = false;
			for (var i = 0; i < 5; i+=2) {
				if (temp[i]==temp[i+1]&&temp[i+1]==temp[i+2]&&temp[i]!=13&&temp[i+3]==temp[i+4]&&temp[i+4]==temp[i+5]&&temp[i+3]!=13&&parseInt(temp[i])+1==temp[i+5]) {
					if (i==0&&temp[6]==temp[7]&&temp[8]==temp[9]) {
						res = parseInt(temp[i+5]);
						break;
					}else if (i==2&&temp[0]==temp[1]&&temp[8]==temp[9]) {
						res = parseInt(temp[i+5]);
						break;
					}else if (i==4&&temp[0]==temp[1]&&temp[2]==temp[3]) {
						res = parseInt(temp[i+5]);
						break;
					}
				}
			}
			return res;
		}
		//15张3带2无敌大飞机
		function feiji15(temp) {
			var res = false;
			for (var i = 0; i < 7; i+=2) {
				if (temp[i]==temp[i+1]&&temp[i+1]==temp[i+2]&&temp[i]!=13&&
					temp[i+3]==temp[i+4]&&temp[i+4]==temp[i+5]&&temp[i+3]!=13&&
					temp[i+6]==temp[i+7]&&temp[i+7]==temp[i+8]&&temp[i+6]!=13&&
					parseInt(temp[i])+1==temp[i+5]&&
					parseInt(temp[i+3])+1==temp[i+8]) {
					if (i==0&&temp[9]==temp[10]&&temp[11]==temp[12]&&temp[13]==temp[14]) {
						res = parseInt(temp[i+8]);
						break;
					}else if (i==2&&temp[0]==temp[1]&&temp[11]==temp[12]&&temp[13]==temp[14]) {
						res = parseInt(temp[i+8]);
						break;
					}else if (i==4&&temp[0]==temp[1]&&temp[2]==temp[3]&&temp[13]==temp[14]) {
						res = parseInt(temp[i+8]);
						break;
					}else if (i==6&&temp[0]==temp[1]&&temp[2]==temp[3]&&temp[4]==temp[5]) {
						res = parseInt(temp[i+8]);
						break;
					}
				}
			}
			return res;
		}
		//判断出牌能否大于其他玩家
		/*
		*参数 poker_data Array 当前玩家要出的牌型数据
		*参数 now_poker null/array 当前桌面上牌型的数据
		*return boolean	如果打得过就返回true，打不过或者牌型不符就返回false
		*/
		function checkVS( poker_data,now_poker ){
			if (now_poker.length == 0) {
				return true;
			}
			//1判断是否王炸
			if (poker_data[1] == 999 ) {
				return true;
			}
			//2如果判断牌型不一致，并且出牌不是炸弹
			if (poker_data[1]!=now_poker[1]&&poker_data[1]!= 998) {
				return  false;
				
			}
			//3如果出的牌是炸弹，桌面的牌不是炸弹，就肯定True
			if (poker_data[1]==998) {
				if (now_poker[1]!=998) {
					return true;
				}else if (now_poker[1]==998) {
					if (poker_data[3]>now_poker[3]) {
						return true;
					}else{
						return false;
					}
				}
			}
			//4如果两上牌型一样，长度不一样直接返回false
			if (poker_data[1] == now_poker[1]&&poker_data[0].length!=now_poker[0].length) {
				return false;	
			}
			/*
				通过以上的判断基本上已经判断完如果两个不同时为炸弹，并且长度不一样的问题
			*/
			// 比较2副牌的key
			if (poker_data[2]>now_poker[2]) {
				return true;
			}else{
				return false;
			}
		}
		//打出后删除的牌
		function delPoker(poker_arr , del_arr){
			while(del_arr.length >0){
				for (var i = 0; i <poker_arr.length ; i++) {
					if (poker_arr[i] == del_arr[0]) {
						poker_arr.splice(i,1);
						break;
					}
				}
				del_arr.splice(0,1);
			}
			return poker_arr;
		}
		//=============================特效图片====================================//
		var shunzi_number = 0;
		var liandui_number = 0;
		var feiji_number = 0;
		//判断出哪张图
		function images_name(temp_arr) {	
			if (temp_arr[1]==999) {									//王炸
				var src = './images/hasaji.jpg';
			}else if (temp_arr[1]==998) {							//炸弹
				var src = './images/zhadan.jpg';
			}else if (temp_arr[1]==9||temp_arr[1]==13||temp_arr[1]==19||temp_arr[1]==23||temp_arr[1]==26||temp_arr[1]==29||temp_arr[1]==31||temp_arr[1]==32) {	//连对
				liandui_number=(++liandui_number>=4)?1:liandui_number;
				if (liandui_number == 1) {
					var src = './images/huangzi.jpg';
				}else if(liandui_number == 2){
					var src = './images/jiansheng.jpg';
				}else if(liandui_number == 3){
					var src = './images/ruiwen.jpg';
				}
			}else if (temp_arr[1]==6||temp_arr[1]==10||temp_arr[1]==11||temp_arr[1]==12||temp_arr[1]==16||temp_arr[1]==18||temp_arr[1]==21||temp_arr[1]==22) {				//顺子
				
				shunzi_number = (++shunzi_number>=4)?1:shunzi_number;
				if (shunzi_number == 1) {
					var src = './images/houzi.jpg';
				}else if(shunzi_number == 2){
					var src = './images/houzi2.jpg';
				}else if(shunzi_number == 3){
					var src = './images/houzi3.jpg';
				}
			}else if (temp_arr[1]==8||temp_arr[1]==14||temp_arr[1]==17||temp_arr[1]==20||temp_arr[1]==24||temp_arr[1]==25||temp_arr[1]==27||temp_arr[1]==28||temp_arr[1]==30) {		//飞机	
				feiji_number=(++feiji_number>=4)?1:feiji_number;
				if (feiji_number == 1) {
					var src = './images/feiji.jpg';
				}else if(feiji_number == 2){
					var src = './images/zhaoxin.jpg';
				}else if(feiji_number == 3){
					var src = './images/mangseng2.jpg';
				}
			}else if(temp_arr[1]==15){
				var src = './images/manwang.jpg';
			}
			return src;
		}
		function images(images_src) {
			if (images_src) {
				$("#images").attr('src',images_src)
				$("#images").css("display","block")
				$("#images").animate({ 
					left:"300px",
				}, 300);
				$("#images").animate({ 
					left:"0px",
				}, 1300);
				$("#images").animate({ 
					left:"-1440px",
				}, 300);
				$("#images").animate({ 
					left:"1440px",
				},1);
				setTimeout(function(){
					$("#images").css("display","none");
				},2000)
			}	
		}
 //=============================音效====================================//
		document.getElementById("bgmusic").volume = 0.2;
		var xp=document.getElementById("music0");      //洗牌
		var fp=document.getElementById("music1");      //发牌
		var qdz_yes=document.getElementById("music2");  //抢地主
		var qdz_no=document.getElementById("music3");   //不抢
		var cp_yes=document.getElementById("music4");  //出牌
		var cp_no=document.getElementById("music5");   //不出

		var liandui_music= document.getElementById("liandui");//连对
		var liandui_music2= document.getElementById("liandui2");//连对
		var liandui_music3= document.getElementById("liandui3");//连对

		var sandaiyi_music = document.getElementById("sandaiyi");//3带1
		var sandaiyidui_music = document.getElementById("sandaiyidui");//3带一对

		var shunzi_music = document.getElementById("shunzi");//顺子
		var shunzi_music2 = document.getElementById("shunzi2");//顺子
		var shunzi_music3 = document.getElementById("shunzi3");//顺子

		var sidaier_music = document.getElementById("sidaier");//四带二
		var sandailiangdui_music = document.getElementById("sidailiangdui");//四带两对

		var feiji_music = document.getElementById("feiji");//飞机
		var feiji_music2 = document.getElementById("feiji2");//飞机
		var feiji_music3 = document.getElementById("feiji3");//飞机
		
		var zhadan_music = document.getElementById("zhadan");//炸弹
		var wangzha_music = document.getElementById("wangzha");//王炸
		var huadouxiele = document.getElementById('huadouxiele');//花都泄了
		var baodan = document.getElementById('baodan');//报单
		var baoshuang = document.getElementById('baoshuang');//报双
		var dan_arr = Array();
		for (var i = 1; i <=15 ; i++) {
			dan_arr[i] = 'dan'+i;
			dan_arr[i] = document.getElementById("dan"+i);
		}
		var dui_arr = Array();
		for (var j = 1; j <=15 ; j++) {
			dui_arr[j] = 'dui'+j;
			dui_arr[j] = document.getElementById("dui"+j);
		}
		function sound(music){
			music.play();
		}
		var shunzi_music_number = 0;
		var liandui_music_number = 0;
		var feiji_music_number = 0;
		function sound_play(temp_arr) {
			if (temp_arr[1]==1) {					//判断单张音效
				var music_key = temp_arr[2];
				for (var i = 1; i <= 15; i++) {
					if (music_key == 12) {			//尖
						sound(dan_arr[1]);
						break;
					}else if (music_key == 13) {	//二
						sound(dan_arr[2]);
						break;
					}else if (music_key == 14) {	//小王
						sound(dan_arr[14]);
						break;
					}else if (music_key == 15) {	//大王
						sound(dan_arr[15]);
						break;
					}else if (i == music_key) {
						sound(dan_arr[i+2]);
					} 

				}
			}else if (temp_arr[1]==2) {				//判断对子音效
				var music_key = temp_arr[2];
				for (var i = 1; i <= 13; i++) {
					if (music_key == 12) {
						sound(dui_arr[1]);
					}else if (music_key == 13) {
						sound(dui_arr[2]);
					} else if (i == music_key) {
						sound(dui_arr[i+2]);
					}
				}
			}else if (temp_arr[1]==9||temp_arr[1]==13||temp_arr[1]==19||temp_arr[1]==23||temp_arr[1]==26||temp_arr[1]==29||temp_arr[1]==31||temp_arr[1]==32) {							//连对
				(++liandui_music_number>4)?1:liandui_music_number;
				if (liandui_music_number == 1) {				//连对
					sound(liandui_music);						
				}else if(liandui_music_number == 2){
					sound(liandui_music2);
				}else if(liandui_music_number == 3){
					sound(liandui_music3);
				}
			}else if (temp_arr[1]==6||temp_arr[1]==10||temp_arr[1]==11||temp_arr[1]==12||temp_arr[1]==16||temp_arr[1]==18||temp_arr[1]==21||temp_arr[1]==22) {
				(++shunzi_music_number>4)?1:shunzi_music_number;
				if (shunzi_music_number == 1) {
					sound(shunzi_music);						//顺子
				}else if(shunzi_music_number == 2){
					sound(shunzi_music2);
				}else if(shunzi_music_number == 3){
					sound(shunzi_music3);
				}
			}else if (temp_arr[1]==8||temp_arr[1]==14||temp_arr[1]==17||temp_arr[1]==20||temp_arr[1]==24||temp_arr[1]==25||temp_arr[1]==27||temp_arr[1]==28||temp_arr[1]==30) {	//飞机				
				(++feiji_music_number>4)?1:feiji_music_number;	
				if (feiji_music_number == 1) {				//飞机
					sound(feiji_music);						
				}else if(feiji_music_number == 2){
					sound(feiji_music2);
				}else if(feiji_music_number == 3){
					sound(feiji_music3);
				}	
			}else if (temp_arr[1]==4) {
				sound(sandaiyi_music);
			}else if (temp_arr[1]==5) {
				sound(sandaiyidui_music);
			}else if (temp_arr[1]==7) {
				sound(sidaier_music);
			}else if (temp_arr[1]==15) {
				sound(sandailiangdui_music);
			}else if (temp_arr[1]==998) {
				sound(zhadan_music);
			}else if (temp_arr[1]==999) {		
				sound(wangzha_music);
			}else{
				sound(cp_yes); //播放出牌音效
			}
		}

});	
	