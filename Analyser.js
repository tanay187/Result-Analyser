var fs = require('fs');
var content = '';
var pos = null;
var pointer1 = '';
var pointer;
var name = '';
var structure = '';
var flipflop = '';
var point_arr=[];
var name_arr=[];
var diff=[];
var sum =0;
var k=0;
var skewness=0.0;
var variance=0.0;
var std_dev=0.0;
var avg=0.0;
var min_diff=100;
var freq=[];
var min_mark=0;
var max_mark=0;
function initialise(arr,number)
{
  for(var i=0;i<number;i++)
  {
    arr[i] = '';
  }
  return arr;
}
for(var i=0;i<10;i++)
	freq[i]=0;
name = initialise(name,10);
pointer1 = initialise(pointer1,10);


for(var schno=131112001;schno<=131112304;schno++)
{
	if(schno==131112224||schno>131112110&&schno<131112201)
		continue;
fs.readFile(
        'cse2results(2nd year)/'+schno.toString()+'.html',
        function(error,data)
		{
			pointer1 = initialise(pointer1,10);
            content = data.toString();
            pos = content.indexOf('SGPA');
            if(pos!==-1)
	    	{
            for(var i=15;i <19;i++)
			{
            if(content[pos+i]!=='<'&&content[pos+i]!=='>'&&content[pos+i]!=='/')
				{
					pointer1 +=content[pos+i];
					
				}
			}
			pointer=(parseFloat)(pointer1);
			if(pointer>4.0)
			point_arr[k]=(pointer);
            }
			if(pointer>=0&&pointer<1)
				freq[0]++;
			if(pointer>=1&&pointer<2)
				freq[1]++;
			if(pointer>=2&&pointer<3)
				freq[2]++;
			if(pointer>=3&&pointer<4)
				freq[3]++;
			if(pointer>=4&&pointer<5)
				freq[4]++;
			if(pointer>=5&&pointer<6)
				freq[5]++;
			if(pointer>=6&&pointer<7)
				freq[6]++;
			if(pointer>=7&&pointer<8)
				freq[7]++;	
			if(pointer>=8&&pointer<9)
				freq[8]++;
			if(pointer>=9)
				freq[9]++;
			if(pointer>0)
			{
			//console.log(pointer-avg);
			variance=variance+(pointer-avg)*(pointer-avg);
			skewness=skewness+(pointer-avg)*(pointer-avg)*(pointer-avg);
			}
	   pos = content.indexOf('Name');
          //console.log(pos);
          if(pos!==-1)
		  {
             for(var i=105;i <135;i++)
		     {
            if(content[pos+i]!=='<'&&content[pos+i]!=='>'&&content[pos+i]!=='/'&&content[pos+i]==content[pos+i].toUpperCase())
				{
					name +=content[pos+i];
				    
				}
             }
		  if(pointer>4.0)
		  name_arr[k]=name;
					//console.log(name_arr[k]);
          }
		 var psn=k-1;
		 var temp_point=point_arr[k];
		 
		 
			  
		  if(pointer>4.0)
		  {
			  sum+=pointer;
			  while(psn>=0&&point_arr[psn]>temp_point)
			{
			 var temp=point_arr[psn]; var temp_name=name_arr[psn];
			point_arr[psn]=point_arr[psn+1];name_arr[psn]=name_arr[psn+1];
			point_arr[psn+1]=temp;name_arr[psn+1]=temp_name;
			psn--;
			}
			 //console.log(k+"  "+name_arr[k]+"  "+point_arr[k]);
			 k++;
			  
			name = '';
			pointer1 = '';
			structure = '';
			
		 }
		 if(k==192)
		  {
				avg=sum/93;
				//console.log(avg);
				variance=variance/93;
				skewness=skewness/93;
				std_dev=Math.sqrt(variance);
				skewness=skewness/(std_dev*std_dev*std_dev);
			 for(var i=k-1;i>=0;i--)
			  {
					if(i!=0)
					{
						diff[k-1-i]=point_arr[i]-point_arr[i-1];
						if(point_arr[i]-point_arr[i-1]<min_diff)
							min_diff=point_arr[i]-point_arr[i-1];
					}
			  
				 
			  structure+="<p><span>"+(k-1-i+1)+"&nbsp&nbsp"+name_arr[i]+"&nbsp</span><span>&nbsp&nbsp"+point_arr[i]+"&nbsp&nbsp</span></p>";
			}
			
			 // structure+="<p><span>"+(i+1)+"&nbsp&nbsp"+name_arr[i]+"&nbsp</span><span>&nbsp&nbsp"+point_arr[i]+"&nbsp&nbsp(Not Clear)</span></p>"
          //console.log(name+"  "+pointer);
			if(structure!=''||structure!=null)
				{
          
					//fs.readFile('resultanalysis.html','utf8',function(err,data){ flipflop = data.toString();});
					//flipflop += structure;
          
					fs.writeFile('resultanalysiscse2.html',structure,function(err)
					{
					console.log(err);
					});
				}
				
			  }
			  structure+="<p><span>Statistics</span></p>";
			  fs.writeFile('resultanalysiscse2.html',structure,function(err)
					{
					console.log(err);
					});
				structure+="<p><span>Average :&nbsp&nbsp"+avg+"</span></p>";	
			  fs.writeFile('resultanalysiscse2.html',structure,function(err)
					{
					console.log(err);
					});
					structure+="<p><span>Variance :&nbsp&nbsp"+variance+"</span></p>";	
			  fs.writeFile('resultanalysiscse2.html',structure,function(err)
					{
					console.log(err);
					});
					structure+="<p><span>Standard Deviation :&nbsp&nbsp"+std_dev+"</span></p>";	
			  fs.writeFile('resultanalysiscse2.html',structure,function(err)
					{
					console.log(err);
					});
					structure+="<p><span>Skewness :&nbsp&nbsp"+skewness+"</span></p>";	
			  fs.writeFile('resultanalysiscse2.html',structure,function(err)
					{
					console.log(err);
					});
					for(var t=0;t<=9;t++)
					{
					structure+="<p><span>Students between SGPA "+t+" and "+(t+1)+":&nbsp&nbsp"+freq[t]+"</span></p>";
			  fs.writeFile('resultanalysiscse2.html',structure,function(err)
					{
					console.log(err);
					});
					}
		  
		});
			
} 
         // console.log(point_arr[0]);
    
	//for(var p=0;p<110;p++)
		//console.log(point_arr[p]);
	
	/* for(var i=0;i<110;i++)
	 {
		//console.log(i+"  "+name_arr[i]+"  "+point_arr[i]);
		 var max_point_pos=i;
		 for(var j=i;j<110;j++)
		 {
			if(point_arr[j]>point_arr[max_point_pos])
			{
				max_point_pos=j;
			}
		 }
		 var temp=point_arr[i]; var temp_name=name_arr[i];
		 point_arr[i]=point_arr[max_point_pos];name_arr[i]=name_arr[max_point_pos];
		 point_arr[max_point_pos]=temp;name_arr[max_point_pos]=temp_name;
		  structure+="<p><span>"+(i+1)+"&nbsp&nbsp"+name_arr[i]+"&nbsp</span><span>&nbsp&nbsp"+point_arr[i]+"&nbsp&nbsp</span></p>";
          
          
          if(structure!=''||structure!=null){
          //if(schno!=131112113)
			  fs.readFile('resultanalysiscse1.html','utf8',function(err,data){ flipflop = data.toString();});
          flipflop += structure;
          
          fs.writeFile('resultanalysiscse1.html',flipflop,function(err){
            //console.log(err);
          });
          }
	 }*/

        
          
          
        

