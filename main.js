 
var st = [-1,-1,-1,-1,-1,-1,-1,-1,-1];
var box=document.querySelectorAll('.box');
var is1p;  //is 1 player mode or two player mode
var turn=0;
var isp0_x;
var isufirst;
document.querySelector('.start').addEventListener("click",function()
{
	this.style.display="none";
   document.querySelector('.choice').style.display="block";
});
document.getElementById('1p').addEventListener("click",function()
{
   is1p=1;
   document.querySelector('.choice').style.display="none";
   document.querySelector('.firstone').style.display="block";
});
document.getElementById('2p').addEventListener("click",function()
{
   is1p=0;
   document.querySelector('.choice').style.display="none";
   document.querySelector('.XorO').style.display="block";
});
document.getElementById('ya').addEventListener("click",function()
{
	isufirst=1;
   document.querySelector('.firstone').style.display="none";
   document.querySelector('.XorO').style.display="block";
});
document.getElementById('na').addEventListener("click",function()
{
	isufirst=0;
   document.querySelector('.firstone').style.display="none";
   document.querySelector('.XorO').style.display="block";
});
document.getElementById('X').addEventListener("click",function()
{
   isp0_x=1;
   document.querySelector('.XorO').style.display="none";
   document.querySelector('.gameboard').style.display="block";
   document.querySelector('.reset').style.display="block";
   if(is1p&&!isufirst)player1();
});
document.getElementById('O').addEventListener("click",function()
{
   isp0_x=0;
   document.querySelector('.XorO').style.display="none";
   document.querySelector('.gameboard').style.display="block";
   document.querySelector('.reset').style.display="block";
   if(is1p&&!isufirst)player1();
});
function eve()
{
	let id=this.getAttribute("id");
	if(is1p)
	{
	 if(!player0(id,0))return;
	 player1();
	}
	else
	{
		if(!player0(id,turn))return;
		turn=1-turn;
	}
	return;
}
for(let i=0;i<box.length;i++)
	box[i].addEventListener("click",eve);

function isfree()
{
    for(let i=0;i<9;i++)if(st[i]==-1)return 1;
   return 0;
}

function calscore()
{
	//0,1,2 
	//3,4,5
	//6,7,8
	//0,3,6
	//1,4,7
	//2,5,8
	//0,4,8
	//2,4,6
	if(st[0]==st[1]&&st[1]==st[2]&&st[0]!=-1)
	{
		if(st[0])return 1;
		return -1;
	}
	if(st[3]==st[4]&&st[4]==st[5]&&st[3]!=-1)
	{
		if(st[3])return 1;
		return -1;
	}
	if(st[6]==st[7]&&st[7]==st[8]&&st[6]!=-1)
	{
		if(st[6])return 1;
		return -1;
	}
	if(st[0]==st[3]&&st[3]==st[6]&&st[0]!=-1)
	{
		if(st[0])return 1;
		return -1;
	}
	if(st[1]==st[4]&&st[4]==st[7]&&st[1]!=-1)
	{
		if(st[1])return 1;
		return -1;
	}
	if(st[2]==st[5]&&st[5]==st[8]&&st[2]!=-1)
	{
		if(st[2])return 1;
		return -1;
	}
	if(st[0]==st[4]&&st[4]==st[8]&&st[0]!=-1)
	{
		if(st[0])return 1;
		return -1;
	}
	if(st[2]==st[4]&&st[4]==st[6]&&st[2]!=-1)
	{
		if(st[2])return 1;
		return -1;
	}
	return 0;
}

function minimax(pl)
{
	var score=calscore();
	if(score)return score;
	if(!isfree())return score;
    if(pl)score=-1000;
    else score=1000;
	for(let i=0;i<9;i++)
		{
			if(st[i]!=-1)continue;
			st[i]=pl;
			if(pl) score=Math.max(score,minimax(1-pl));
			else score=Math.min(score,minimax(1-pl));
			st[i]=-1;
		}
	return score;
}
function gameover()
{
	for(let i=0;i<box.length;i++)
	box[i].removeEventListener("click",eve);
    return;
}
function win(pl)
{
   gameover();
   if(pl)
   {
   	 if(is1p)alert("computer win!!");
   	 else alert("second player win!!");
   }
   else 
   {
   	 if(is1p)alert("U win!!");
   	 else alert("first player win!!");
   }
   return;
}
function tie()
{
	gameover();
	alert("TieUP!!");
	return;
}
function moveto(pl,id)
{
	if(st[id]!=-1)
	{
       alert("Invalid Move.");
       return 0;
	}
	st[id]=pl;
	var q=box[id];
    var val="X";
    if((!pl&&!!!isp0_x)||(pl&&isp0_x))val="O";
    q.innerHTML=val;
	return 1;
}
function player0(id,pl)
{
   // after turn
    if(!moveto(pl,id))return 0;
    var score=calscore();
	if(score)
	{
		win(pl);
		return 0;
	}
	if(!isfree())
	{
		tie();
		return 0;
	}
	return 1;
}
function player1()
{
	var id;
	var score=-1000;
	for(let i=0;i<9;i++)
		{
			if(st[i]!=-1)continue;
			st[i]=1;
			let val=minimax(0);
			if(val>score)
			{
				score=val;
				id=i;
			}
			st[i]=-1;
		}
	moveto(1,id)
	score=calscore();
	if(score)win(1);
	if(!isfree())tie();
	return 1;
}