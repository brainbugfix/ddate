/**
 * All Hail Discordia! - this script prints Discordian date using system date.
 *
 * lang: JavaScript
 * author: jklu
 * contributors: JamesMcGuigan
 *
 * changelog:
 * - Modified to return same output syntax as unix ddate + module.exports - James McGuigan, 2/Chaos/3183
 *
 * source: https://rosettacode.org/wiki/Discordian_date#JavaScript
 */

module.exports = function(RED) 
{	

  var seasons = [
    "Chaos", "Discord", "Confusion",
    "Bureaucracy", "The Aftermath"
  ];
  var weekday = [
    "Sweetmorn", "Boomtime", "Pungenday",
    "Prickle-Prickle", "Setting Orange"
  ];
  
  var apostle = [
    "Mungday", "Mojoday", "Syaday",
    "Zaraday", "Maladay"
  ];
  
  var holiday = [
    "Chaoflux", "Discoflux", "Confuflux",
    "Bureflux", "Afflux"
  ];
  
  
  Date.prototype.isLeapYear = function() {
    var year = this.getFullYear();
    if( (year & 3) !== 0 ) { return false; }
    return ((year % 100) !== 0 || (year % 400) === 0);
  };
  
  // Get Day of Year
  Date.prototype.getDOY = function() {
    var dayCount  = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
    var mn        = this.getMonth();
    var dn        = this.getDate();
    var dayOfYear = dayCount[mn] + dn;
    if( mn > 1 && this.isLeapYear() ) { dayOfYear++; }
    return dayOfYear;
  };
  
  Date.prototype.isToday = function() {
    var today = new Date();
    return this.getDate()     === today.getDate()
        && this.getMonth()    === today.getMonth()
        && this.getFullYear() === today.getFullYear()
    ;
  };
  
  function discordianDate(date) {
    if( !date ) { date = new Date(); }
  
    var y                = date.getFullYear();
    var yold             = y + 1166;
    var dayOfYear        = date.getDOY();
    var celebrateHoliday = null;
  
    if( date.isLeapYear() ) {
      if( dayOfYear == 60 ) {
        celebrateHoliday = "St. Tib's Day";
      }
      else if( dayOfYear > 60 ) {
        dayOfYear--;
      }
    }
    dayOfYear--;
  
    var divDay = Math.floor(dayOfYear / 73);
  
    var seasonDay = (dayOfYear % 73) + 1;
    if( seasonDay == 5 ) {
      celebrateHoliday = apostle[divDay];
    }
    if( seasonDay == 50 ) {
      celebrateHoliday = holiday[divDay];
    }
  
    var season    = seasons[divDay];
    var dayOfWeek = weekday[dayOfYear % 5];
  
    var nth = (seasonDay % 10 == 1 && seasonDay != 11) ? 'st'
            : (seasonDay % 10 == 2 && seasonDay != 12) ? 'nd'
            : (seasonDay % 10 == 3 && seasonDay != 13) ? 'rd'
                                    : 'th';
  
    return "" //(date.isToday() ? "Today is " : '')
          + dayOfWeek
          + ", the " + seasonDay + nth
          + " day of " + season
          + " in the YOLD " + yold
          + (celebrateHoliday ? ". Celebrate " + celebrateHoliday + "!" : '')
      ;
  }
 
  function DdateNode(config) 
  {
		RED.nodes.createNode(this, config);

    this.on('input', function(msg, send, done) 
    {
      var timestamp;
      if (typeof msg.payload !== "number")
        timestamp = parseInt(msg.payload);
      else
        timestamp = msg.payload;
      if (isNaN(timestamp))
        msg.payload = discordianDate(new Date(Date.now()));
      else
        msg.payload = discordianDate(new Date(timestamp));

      if (done) 
        done();
        
      this.send(msg);
    });
        
    this.on('close', function() {
			// tidy up any state
		});
	}
  RED.nodes.registerType("ddate", DdateNode);
}
