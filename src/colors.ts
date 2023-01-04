// import { Color } from "vscode";


// const colors: Map<string, Color> = new Map([
// ["silver", new Color(0.7529411764705882, 0.7529411764705882, 0.7529411764705882, 1)],
// ["gray", new Color(0.5019607843137255, 0.5019607843137255, 0.5019607843137255, 1)],
// ["white", new Color(1, 1, 1, 1)],
// ["maroon", new Color(0.5019607843137255, 0, 0, 1)],
// ["red", new Color(1, 0, 0, 1)],
// ["purple", new Color(0.5019607843137255, 0, 0.5019607843137255, 1)],
// ["fuchsia", new Color(1, 0, 1, 1)],
// ["green", new Color(0, 0.5019607843137255, 0, 1)],
// ["lime", new Color(0, 1, 0, 1)],
// ["olive", new Color(0.5019607843137255, 0.5019607843137255, 0, 1)],
// ["yellow", new Color(1, 1, 0, 1)],
// ["navy", new Color(0, 0, 0.5019607843137255, 1)],
// ["blue", new Color(0, 0, 1, 1)],
// ["teal", new Color(0, 0.5019607843137255, 0.5019607843137255, 1)],
// ["aqua", new Color(0, 1, 1, 1)],
// ["orange", new Color(1, 0.6470588235294118, 0, 1)],
// ["aliceblue", new Color(0.9411764705882353, 0.9725490196078431, 1, 1)],
// ["antiquewhite", new Color(0.9803921568627451, 0.9215686274509803, 0.8431372549019608, 1)],
// ["aquamarine", new Color(0.4980392156862745, 1, 0.8313725490196079, 1)],
// ["azure", new Color(0.9411764705882353, 1, 1, 1)],
// ["beige", new Color(0.9607843137254902, 0.9607843137254902, 0.8627450980392157, 1)],
// ["bisque", new Color(1, 0.8941176470588236, 0.7686274509803922, 1)],
// ["blanchedalmond", new Color(1, 0.8941176470588236, 0.7686274509803922, 1)],
// ["blueviolet", new Color(0.5411764705882353, 0.16862745098039217, 0.8862745098039215, 1)],
// ["brown", new Color(0.6470588235294118, 0.16470588235294117, 0.16470588235294117, 1)],
// ["burlywood", new Color(0.8705882352941177, 0.7215686274509804, 0.5294117647058824, 1)],
// ["cadetblue", new Color(0.37254901960784315, 0.6196078431372549, 0.6274509803921569, 1)],
// ["chartreuse", new Color(0.4980392156862745, 1, 0, 1)],
// ["chocolate", new Color(0.8235294117647058, 0.4117647058823529, 0.11764705882352941, 1)],
// ["coral", new Color(1, 0.4980392156862745, 0.3137254901960784, 1)],
// ["cornflowerblue", new Color(0.39215686274509803, 0.5843137254901961, 0.9294117647058824, 1)],
// ["cornsilk", new Color(1, 0.9725490196078431, 0.8627450980392157, 1)],
// ["crimson", new Color(0.8627450980392157, 0.0784313725490196, 0.23529411764705882, 1)],
// ["darkblue", new Color(0, 0, 0.5450980392156862, 1)],
// ["darkcyan", new Color(0, 0.5450980392156862, 0.5450980392156862, 1)],
// ["darkgoldenrod", new Color(0.7215686274509804, 0.5254901960784314, 0.043137254901960784, 1)],
// ["darkgray", new Color(0.6627450980392157, 0.6627450980392157, 0.6627450980392157, 1)],
// ["darkgreen", new Color(0, 0.39215686274509803, 0, 1)],
// ["darkgrey", new Color(0.6627450980392157, 0.6627450980392157, 0.6627450980392157, 1)],
// ["darkkhaki", new Color(0.7411764705882353, 0.7176470588235294, 0.4196078431372549, 1)],
// ["darkmagenta", new Color(0.5450980392156862, 0, 0.5450980392156862, 1)],
// ["darkolivegreen", new Color(0.3333333333333333, 0.4196078431372549, 0.1843137254901961, 1)],
// ["darkorange", new Color(1, 0.5490196078431373, 0, 1)],
// ["darkorchid", new Color(0.6, 0.19607843137254902, 0.8, 1)],
// ["darkred", new Color(0.5450980392156862, 0, 0, 1)],
// ["darksalmon", new Color(0.9137254901960784, 0.5882352941176471, 0.47843137254901963, 1)],
// ["darkseagreen", new Color(0.5607843137254902, 0.7372549019607844, 0.5607843137254902, 1)],
// ["darkslateblue", new Color(0.2823529411764706, 0.23921568627450981, 0.5450980392156862, 1)],
// ["darkslategray", new Color(0.1843137254901961, 0.30980392156862746, 0.30980392156862746, 1)],
// ["darkslategrey", new Color(0.1843137254901961, 0.30980392156862746, 0.30980392156862746, 1)],
// ["darkturquoise", new Color(0, 0.807843137254902, 0.8196078431372549, 1)],
// ["darkviolet", new Color(0.5803921568627451, 0, 0.8274509803921568, 1)],
// ["deeppink", new Color(1, 0.0784313725490196, 0.5764705882352941, 1)],
// ["deepskyblue", new Color(0, 0.7490196078431373, 1, 1)],
// ["dimgray", new Color(0.4117647058823529, 0.4117647058823529, 0.4117647058823529, 1)],
// ["dimgrey", new Color(0.4117647058823529, 0.4117647058823529, 0.4117647058823529, 1)],
// ["dodgerblue", new Color(0.11764705882352941, 0.5647058823529412, 1, 1)],
// ["firebrick", new Color(0.6980392156862745, 0.13333333333333333, 0.13333333333333333, 1)],
// ["floralwhite", new Color(1, 0.9803921568627451, 0.9411764705882353, 1)],
// ["forestgreen", new Color(0.13333333333333333, 0.5450980392156862, 0.13333333333333333, 1)],
// ["gainsboro", new Color(0.8627450980392157, 0.8627450980392157, 0.8627450980392157, 1)],
// ["ghostwhite", new Color(0.9725490196078431, 0.9725490196078431, 1, 1)],
// ["gold", new Color(1, 0.8431372549019608, 0, 1)],
// ["goldenrod", new Color(0.8549019607843137, 0.6470588235294118, 0.12549019607843137, 1)],
// ["greenyellow", new Color(0.6784313725490196, 1, 0.1843137254901961, 1)],
// ["grey", new Color(0.5019607843137255, 0.5019607843137255, 0.5019607843137255, 1)],
// ["honeydew", new Color(0.9411764705882353, 1, 0.9411764705882353, 1)],
// ["hotpink", new Color(1, 0.4117647058823529, 0.7058823529411765, 1)],
// ["indianred", new Color(0.803921568627451, 0.3607843137254902, 0.3607843137254902, 1)],
// ["indigo", new Color(0.29411764705882354, 0, 0.5098039215686274, 1)],
// ["ivory", new Color(1, 1, 0.9411764705882353, 1)],
// ["khaki", new Color(0.9411764705882353, 0.9019607843137255, 0.5490196078431373, 1)],
// ["lavender", new Color(0.9019607843137255, 0.9019607843137255, 0.9803921568627451, 1)],
// ["lavenderblush", new Color(1, 0.9411764705882353, 0.9607843137254902, 1)],
// ["lawngreen", new Color(0.48627450980392156, 0.9882352941176471, 0, 1)],
// ["lemonchiffon", new Color(1, 0.9803921568627451, 0.803921568627451, 1)],
// ["lightblue", new Color(0.6784313725490196, 0.8470588235294118, 0.9019607843137255, 1)],
// ["lightcoral", new Color(0.9411764705882353, 0.5019607843137255, 0.5019607843137255, 1)],
// ["lightcyan", new Color(0.8784313725490196, 1, 1, 1)],
// ["lightgoldenrodyellow", new Color(0.9803921568627451, 0.9803921568627451, 0.8235294117647058, 1)],
// ["lightgray", new Color(0.8274509803921568, 0.8274509803921568, 0.8274509803921568, 1)],
// ["lightgreen", new Color(0.5647058823529412, 0.9333333333333333, 0.5647058823529412, 1)],
// ["lightgrey", new Color(0.8274509803921568, 0.8274509803921568, 0.8274509803921568, 1)],
// ["lightpink", new Color(1, 0.7137254901960784, 0.7568627450980392, 1)],
// ["lightsalmon", new Color(1, 0.6274509803921569, 0.47843137254901963, 1)],
// ["lightseagreen", new Color(0.12549019607843137, 0.6980392156862745, 0.6666666666666666, 1)],
// ["lightskyblue", new Color(0.5294117647058824, 0.807843137254902, 0.9803921568627451, 1)],
// ["lightslategray", new Color(0.4666666666666667, 0.5333333333333333, 0.6, 1)],
// ["lightslategrey", new Color(0.4666666666666667, 0.5333333333333333, 0.6, 1)],
// ["lightsteelblue", new Color(0.6901960784313725, 0.7686274509803922, 0.8705882352941177, 1)],
// ["lightyellow", new Color(1, 1, 0.8784313725490196, 1)],
// ["limegreen", new Color(0.19607843137254902, 0.803921568627451, 0.19607843137254902, 1)],
// ["linen", new Color(0.9803921568627451, 0.9411764705882353, 0.9019607843137255, 1)],
// ["mediumaquamarine", new Color(0.4, 0.803921568627451, 0.6666666666666666, 1)],
// ["mediumblue", new Color(0, 0, 0.803921568627451, 1)],
// ["mediumorchid", new Color(0.7294117647058823, 0.3333333333333333, 0.8274509803921568, 1)],
// ["mediumpurple", new Color(0.5764705882352941, 0.4392156862745098, 0.8588235294117647, 1)],
// ["mediumseagreen", new Color(0.23529411764705882, 0.7019607843137254, 0.44313725490196076, 1)],
// ["mediumslateblue", new Color(0.4823529411764706, 0.40784313725490196, 0.9333333333333333, 1)],
// ["mediumspringgreen", new Color(0, 0.9803921568627451, 0.6039215686274509, 1)],
// ["mediumturquoise", new Color(0.2823529411764706, 0.8196078431372549, 0.8, 1)],
// ["mediumvioletred", new Color(0.7803921568627451, 0.08235294117647059, 0.5215686274509804, 1)],
// ["midnightblue", new Color(0.09803921568627451, 0.09803921568627451, 0.4392156862745098, 1)],
// ["mintcream", new Color(0.9607843137254902, 1, 0.9803921568627451, 1)],
// ["mistyrose", new Color(1, 0.8941176470588236, 0.8823529411764706, 1)],
// ["moccasin", new Color(1, 0.8941176470588236, 0.7098039215686275, 1)],
// ["navajowhite", new Color(1, 0.8705882352941177, 0.6784313725490196, 1)],
// ["oldlace", new Color(0.9921568627450981, 0.9607843137254902, 0.9019607843137255, 1)],
// ["olivedrab", new Color(0.4196078431372549, 0.5568627450980392, 0.13725490196078433, 1)],
// ["orangered", new Color(1, 0.27058823529411763, 0, 1)],
// ["orchid", new Color(0.8549019607843137, 0.4392156862745098, 0.8392156862745098, 1)],
// ["palegoldenrod", new Color(0.9333333333333333, 0.9098039215686274, 0.6666666666666666, 1)],
// ["palegreen", new Color(0.596078431372549, 0.984313725490196, 0.596078431372549, 1)],
// ["paleturquoise", new Color(0.6862745098039216, 0.9333333333333333, 0.9333333333333333, 1)],
// ["palevioletred", new Color(0.8588235294117647, 0.4392156862745098, 0.5764705882352941, 1)],
// ["papayawhip", new Color(1, 0.9372549019607843, 0.8352941176470589, 1)],
// ["peachpuff", new Color(1, 0.8549019607843137, 0.7254901960784313, 1)],
// ["peru", new Color(0.803921568627451, 0.5215686274509804, 0.24705882352941178, 1)],
// ["pink", new Color(1, 0.7529411764705882, 0.796078431372549, 1)],
// ["plum", new Color(0.8666666666666667, 0.6274509803921569, 0.8666666666666667, 1)],
// ["powderblue", new Color(0.6901960784313725, 0.8784313725490196, 0.9019607843137255, 1)],
// ["rosybrown", new Color(0.7372549019607844, 0.5607843137254902, 0.5607843137254902, 1)],
// ["royalblue", new Color(0.2549019607843137, 0.4117647058823529, 0.8823529411764706, 1)],
// ["saddlebrown", new Color(0.5450980392156862, 0.27058823529411763, 0.07450980392156863, 1)],
// ["salmon", new Color(0.9803921568627451, 0.5019607843137255, 0.4470588235294118, 1)],
// ["sandybrown", new Color(0.9568627450980393, 0.6431372549019608, 0.3764705882352941, 1)],
// ["seagreen", new Color(0.1803921568627451, 0.5450980392156862, 0.3411764705882353, 1)],
// ["seashell", new Color(1, 0.9607843137254902, 0.9333333333333333, 1)],
// ["sienna", new Color(0.6274509803921569, 0.3215686274509804, 0.17647058823529413, 1)],
// ["skyblue", new Color(0.5294117647058824, 0.807843137254902, 0.9215686274509803, 1)],
// ["slateblue", new Color(0.41568627450980394, 0.35294117647058826, 0.803921568627451, 1)],
// ["slategray", new Color(0.4392156862745098, 0.5019607843137255, 0.5647058823529412, 1)],
// ["slategrey", new Color(0.4392156862745098, 0.5019607843137255, 0.5647058823529412, 1)],
// ["snow", new Color(1, 0.9803921568627451, 0.9803921568627451, 1)],
// ["springgreen", new Color(0, 1, 0.4980392156862745, 1)],
// ["steelblue", new Color(0.27450980392156865, 0.5098039215686274, 0.7058823529411765, 1)],
// ["tan", new Color(0.8235294117647058, 0.7058823529411765, 0.5490196078431373, 1)],
// ["thistle", new Color(0.8470588235294118, 0.7490196078431373, 0.8470588235294118, 1)],
// ["tomato", new Color(1, 0.38823529411764707, 0.2784313725490196, 1)],
// ["turquoise", new Color(0.25098039215686274, 0.8784313725490196, 0.8156862745098039, 1)],
// ["violet", new Color(0.9333333333333333, 0.5098039215686274, 0.9333333333333333, 1)],
// ["wheat", new Color(0.9607843137254902, 0.8705882352941177, 0.7019607843137254, 1)],
// ["whitesmoke", new Color(0.9607843137254902, 0.9607843137254902, 0.9607843137254902, 1)],
// ["yellowgreen", new Color(0.6039215686274509, 0.803921568627451, 0.19607843137254902, 1)],
// ["rebeccapurple", new Color(0.4, 0.2, 0.6, 1)],
// ]);


const colors = `silver#c0c0c0
gray#808080
white#ffffff
maroon#800000
red#ff0000
purple#800080
fuchsia#ff00ff
green#008000
lime#00ff00
olive#808000
yellow#ffff00
navy#000080
blue#0000ff
teal#008080
aqua#00ffff
orange#ffa500
aliceblue#f0f8ff
antiquewhite#faebd7
aquamarine#7fffd4
azure#f0ffff
beige#f5f5dc
bisque#ffe4c4
blanchedalmond#ffe4c4
blueviolet#8a2be2
brown#a52a2a
burlywood#deb887
cadetblue#5f9ea0
chartreuse#7fff00
chocolate#d2691e
coral#ff7f50
cornflowerblue#6495ed
cornsilk#fff8dc
crimson#dc143c
darkblue#00008b
darkcyan#008b8b
darkgoldenrod#b8860b
darkgray#a9a9a9
darkgreen#006400
darkgrey#a9a9a9
darkkhaki#bdb76b
darkmagenta#8b008b
darkolivegreen#556b2f
darkorange#ff8c00
darkorchid#9932cc
darkred#8b0000
darksalmon#e9967a
darkseagreen#8fbc8f
darkslateblue#483d8b
darkslategray#2f4f4f
darkslategrey#2f4f4f
darkturquoise#00ced1
darkviolet#9400d3
deeppink#ff1493
deepskyblue#00bfff
dimgray#696969
dimgrey#696969
dodgerblue#1e90ff
firebrick#b22222
floralwhite#fffaf0
forestgreen#228b22
gainsboro#dcdcdc
ghostwhite#f8f8ff
gold#ffd700
goldenrod#daa520
greenyellow#adff2f
grey#808080
honeydew#f0fff0
hotpink#ff69b4
indianred#cd5c5c
indigo#4b0082
ivory#fffff0
khaki#f0e68c
lavender#e6e6fa
lavenderblush#fff0f5
lawngreen#7cfc00
lemonchiffon#fffacd
lightblue#add8e6
lightcoral#f08080
lightcyan#e0ffff
lightgoldenrodyellow#fafad2
lightgray#d3d3d3
lightgreen#90ee90
lightgrey#d3d3d3
lightpink#ffb6c1
lightsalmon#ffa07a
lightseagreen#20b2aa
lightskyblue#87cefa
lightslategray#778899
lightslategrey#778899
lightsteelblue#b0c4de
lightyellow#ffffe0
limegreen#32cd32
linen#faf0e6
mediumaquamarine#66cdaa
mediumblue#0000cd
mediumorchid#ba55d3
mediumpurple#9370db
mediumseagreen#3cb371
mediumslateblue#7b68ee
mediumspringgreen#00fa9a
mediumturquoise#48d1cc
mediumvioletred#c71585
midnightblue#191970
mintcream#f5fffa
mistyrose#ffe4e1
moccasin#ffe4b5
navajowhite#ffdead
oldlace#fdf5e6
olivedrab#6b8e23
orangered#ff4500
orchid#da70d6
palegoldenrod#eee8aa
palegreen#98fb98
paleturquoise#afeeee
palevioletred#db7093
papayawhip#ffefd5
peachpuff#ffdab9
peru#cd853f
pink#ffc0cb
plum#dda0dd
powderblue#b0e0e6
rosybrown#bc8f8f
royalblue#4169e1
saddlebrown#8b4513
salmon#fa8072
sandybrown#f4a460
seagreen#2e8b57
seashell#fff5ee
sienna#a0522d
skyblue#87ceeb
slateblue#6a5acd
slategray#708090
slategrey#708090
snow#fffafa
springgreen#00ff7f
steelblue#4682b4
tan#d2b48c
thistle#d8bfd8
tomato#ff6347
turquoise#40e0d0
violet#ee82ee
wheat#f5deb3
whitesmoke#f5f5f5
yellowgreen#9acd32
rebeccapurple#663399`;

export default colors;



