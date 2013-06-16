/*
 * If you are curious, here is how I generated the video:
 *   ffmpeg -an -f x11grab -r 30 -s 460x285 -i :0.0+1920,0 -pix_fmt yuv444p -vcodec libx264 -x264opts crf=0 out.mp4
 *   mplayer -fps 3000 -vo png out.mp4
 *   montage *.png -tile x7 -geometry '460x285' out.png
 *   pngcrush out.png video.png
 */

$(function() {
  var width = 460;
  var height = 285;
  var total_frames = 447;
  var rows = 7; /* Firefox sucks balls when it comes to wide pngs */

  var video = $('.video');
  var frames_per_row = Math.ceil(total_frames / rows);
  var current_frame;
  var timer;

  var startPlayback = function() {
    current_frame = 0;
    nextFrame();
    setTimeout(function() { timer = setInterval(nextFrame, 33) }, 3000);
  };

  var nextFrame = function() {
    var x =  width * (current_frame % frames_per_row);
    var y = height * Math.floor(current_frame / frames_per_row);
    var position = "-" + x + "px -" + y + "px";
    video.css('background-position', position);

    current_frame += 1;
    if (current_frame >= total_frames) {
      clearTimeout(timer);
      setTimeout(startPlayback, 5000);
    }
  };

  $("<img src='/img/video.png' />").load(function() { startPlayback(); });
});
