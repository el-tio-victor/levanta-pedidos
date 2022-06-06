import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "formaturl",
})
export class FormaturlPipe implements PipeTransform {
  transform(value: String): String {
    var c = value.toLowerCase();
    var ct = this.normalize(c);
    return ct;
  }
  normalize(string) {
    var from = "ÃÀÁÄÂÈÉËÊÌÍÏÎÒÓÖÔÙÚÜÛãàáäâèéëêìíïîòóöôùúüûÑñÇç",
      to = "AAAAAEEEEIIIIOOOOUUUUaaaaaeeeeiiiioooouuuunncc",
      mapping = {};
    for (var i = 0, j = from.length; i < j; i++)
      mapping[from.charAt(i)] = to.charAt(i);
    var ret = [];
    for (let i = 0, j = string.length; i < j; i++) {
      var c = string.charAt(i);
      if (mapping.hasOwnProperty(string.charAt(i))) ret.push(mapping[c]);
      else ret.push(c);
    }
    return ret.join("");
  }
}
