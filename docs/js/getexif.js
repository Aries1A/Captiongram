(function() {
  function e(e) {
    return !!e.exifdata
  }

  function t(e, t) {
    t = t || e.match(/^data\:([^\;]+)\;base64,/im)[1] || "", e = e.replace(/^data\:([^\;]+)\;base64,/gim, "");
    for (var n = atob(e), r = n.length, o = new ArrayBuffer(r), i = new Uint8Array(o), a = 0; r > a; a++) i[a] = n.charCodeAt(a);
    return o
  }

  function r(e, t) {
    var n = new XMLHttpRequest;
    n.open("GET", e, !0), n.responseType = "blob", n.onload = function(e) {
      (200 == this.status || 0 === this.status) && t(this.response)
    }, n.send()
  }

  function o(e, n) {
    function o(t) {
      var r = i(t),
        o = a(t);
      e.exifdata = r || {}, e.iptcdata = o || {}, n && n.call(e)
    }
    if (e.src)
      if (/^data\:/i.test(e.src)) {
        var s = t(e.src);
        o(s)
      } else if (/^blob\:/i.test(e.src)) {
      var l = new FileReader;
      l.onload = function(e) {
        o(e.target.result)
      }, r(e.src, function(e) {
        l.readAsArrayBuffer(e)
      })
    } else {
      var u = new XMLHttpRequest;
      u.onload = function() {
        if (200 != this.status && 0 !== this.status) throw "Could not load image";
        o(u.response), u = null
      }, u.open("GET", e.src, !0), u.responseType = "arraybuffer", u.send(null)
    } else if (window.FileReader && (e instanceof window.Blob || e instanceof window.File)) {
      var l = new FileReader;
      l.onload = function(e) {
        f && console.log("Got file of length " + e.target.result.byteLength), o(e.target.result)
      }, l.readAsArrayBuffer(e)
    }
  }

  function i(e) {
    var t = new DataView(e);
    if (f && console.log("Got file of length " + e.byteLength), 255 != t.getUint8(0) || 216 != t.getUint8(1)) return f && console.log("Not a valid JPEG"), !1;
    for (var n, r = 2, o = e.byteLength; o > r;) {
      if (255 != t.getUint8(r)) return f && console.log("Not a valid marker at offset " + r + ", found: " + t.getUint8(r)), !1;
      if (n = t.getUint8(r + 1), f && console.log(n), 225 == n) return f && console.log("Found 0xFFE1 marker"), c(t, r + 4, t.getUint16(r + 2) - 2);
      r += 2 + t.getUint16(r + 2)
    }
  }

  function a(e) {
    var t = new DataView(e);
    if (f && console.log("Got file of length " + e.byteLength), 255 != t.getUint8(0) || 216 != t.getUint8(1)) return f && console.log("Not a valid JPEG"), !1;
    for (var n = 2, r = e.byteLength, o = function(e, t) {
        return 56 === e.getUint8(t) && 66 === e.getUint8(t + 1) && 73 === e.getUint8(t + 2) && 77 === e.getUint8(t + 3) && 4 === e.getUint8(t + 4) && 4 === e.getUint8(t + 5)
      }; r > n;) {
      if (o(t, n)) {
        var i = t.getUint8(n + 7);
        i % 2 !== 0 && (i += 1), 0 === i && (i = 4);
        var a = n + 8 + i,
          l = t.getUint16(n + 6 + i);
        return s(e, a, l)
      }
      n++
    }
  }

  function s(e, t, n) {
    for (var r, o, i, a, s, l = new DataView(e), u = {}, c = t; t + n > c;) 28 === l.getUint8(c) && 2 === l.getUint8(c + 1) && (a = l.getUint8(c + 2), a in F && (i = l.getInt16(c + 3), s = i + 5, o = F[a], r = d(l, c + 5, i), u.hasOwnProperty(o) ? u[o] instanceof Array ? u[o].push(r) : u[o] = [u[o], r] : u[o] = r)), c++;
    return u
  }

  function l(e, t, n, r, o) {
    var i, a, s, l = e.getUint16(n, !o),
      d = {};
    for (s = 0; l > s; s++) i = n + 12 * s + 2, a = r[e.getUint16(i, !o)], !a && f && console.log("Unknown tag: " + e.getUint16(i, !o)), d[a] = u(e, i, t, n, o);
    return d
  }

  function u(e, t, n, r, o) {
    var i, a, s, l, u, c, f = e.getUint16(t + 2, !o),
      g = e.getUint32(t + 4, !o),
      h = e.getUint32(t + 8, !o) + n;
    switch (f) {
      case 1:
      case 7:
        if (1 == g) return e.getUint8(t + 8, !o);
        for (i = g > 4 ? h : t + 8, a = [], l = 0; g > l; l++) a[l] = e.getUint8(i + l);
        return a;
      case 2:
        return i = g > 4 ? h : t + 8, d(e, i, g - 1);
      case 3:
        if (1 == g) return e.getUint16(t + 8, !o);
        for (i = g > 2 ? h : t + 8, a = [], l = 0; g > l; l++) a[l] = e.getUint16(i + 2 * l, !o);
        return a;
      case 4:
        if (1 == g) return e.getUint32(t + 8, !o);
        for (a = [], l = 0; g > l; l++) a[l] = e.getUint32(h + 4 * l, !o);
        return a;
      case 5:
        if (1 == g) return u = e.getUint32(h, !o), c = e.getUint32(h + 4, !o), s = new Number(u / c), s.numerator = u, s.denominator = c, s;
        for (a = [], l = 0; g > l; l++) u = e.getUint32(h + 8 * l, !o), c = e.getUint32(h + 4 + 8 * l, !o), a[l] = new Number(u / c), a[l].numerator = u, a[l].denominator = c;
        return a;
      case 9:
        if (1 == g) return e.getInt32(t + 8, !o);
        for (a = [], l = 0; g > l; l++) a[l] = e.getInt32(h + 4 * l, !o);
        return a;
      case 10:
        if (1 == g) return e.getInt32(h, !o) / e.getInt32(h + 4, !o);
        for (a = [], l = 0; g > l; l++) a[l] = e.getInt32(h + 8 * l, !o) / e.getInt32(h + 4 + 8 * l, !o);
        return a
    }
  }

  function d(e, t, r) {
    var o = "";
    for (n = t; n < t + r; n++) o += String.fromCharCode(e.getUint8(n));
    return o
  }

  function c(e, t) {
    if ("Exif" != d(e, t, 4)) return f && console.log("Not valid EXIF data! " + d(e, t, 4)), !1;
    var n, r, o, i, a, s = t + 6;
    if (18761 == e.getUint16(s)) n = !1;
    else {
      if (19789 != e.getUint16(s)) return f && console.log("Not valid TIFF data! (no 0x4949 or 0x4D4D)"), !1;
      n = !0
    }
    if (42 != e.getUint16(s + 2, !n)) return f && console.log("Not valid TIFF data! (no 0x002A)"), !1;
    var u = e.getUint32(s + 4, !n);
    if (8 > u) return f && console.log("Not valid TIFF data! (First offset less than 8)", e.getUint32(s + 4, !n)), !1;
    if (r = l(e, s, s + u, p, n), r.ExifIFDPointer) {
      i = l(e, s, s + r.ExifIFDPointer, m, n);
      for (o in i) {
        switch (o) {
          case "LightSource":
          case "Flash":
          case "MeteringMode":
          case "ExposureProgram":
          case "SensingMethod":
          case "SceneCaptureType":
          case "SceneType":
          case "CustomRendered":
          case "WhiteBalance":
          case "GainControl":
          case "Contrast":
          case "Saturation":
          case "Sharpness":
          case "SubjectDistanceRange":
          case "FileSource":
            i[o] = P[o][i[o]];
            break;
          case "ExifVersion":
          case "FlashpixVersion":
            i[o] = String.fromCharCode(i[o][0], i[o][1], i[o][2], i[o][3]);
            break;
          case "ComponentsConfiguration":
            i[o] = P.Components[i[o][0]] + P.Components[i[o][1]] + P.Components[i[o][2]] + P.Components[i[o][3]]
        }
        r[o] = i[o]
      }
    }
    if (r.GPSInfoIFDPointer) {
      a = l(e, s, s + r.GPSInfoIFDPointer, S, n);
      for (o in a) {
        switch (o) {
          case "GPSVersionID":
            a[o] = a[o][0] + "." + a[o][1] + "." + a[o][2] + "." + a[o][3]
        }
        r[o] = a[o]
      }
    }
    return r
  }
  var f = !1,
    g = this,
    h = function(e) {
      return e instanceof h ? e : this instanceof h ? void(this.EXIFwrapped = e) : new h(e)
    };
  "undefined" != typeof exports ? ("undefined" != typeof module && module.exports && (exports = module.exports = h), exports.EXIF = h) : g.EXIF = h;
  var m = h.Tags = {
      36864: "ExifVersion",
      40960: "FlashpixVersion",
      40961: "ColorSpace",
      40962: "PixelXDimension",
      40963: "PixelYDimension",
      37121: "ComponentsConfiguration",
      37122: "CompressedBitsPerPixel",
      37500: "MakerNote",
      37510: "UserComment",
      40964: "RelatedSoundFile",
      36867: "DateTimeOriginal",
      36868: "DateTimeDigitized",
      37520: "SubsecTime",
      37521: "SubsecTimeOriginal",
      37522: "SubsecTimeDigitized",
      33434: "ExposureTime",
      33437: "FNumber",
      34850: "ExposureProgram",
      34852: "SpectralSensitivity",
      34855: "ISOSpeedRatings",
      34856: "OECF",
      37377: "ShutterSpeedValue",
      37378: "ApertureValue",
      37379: "BrightnessValue",
      37380: "ExposureBias",
      37381: "MaxApertureValue",
      37382: "SubjectDistance",
      37383: "MeteringMode",
      37384: "LightSource",
      37385: "Flash",
      37396: "SubjectArea",
      37386: "FocalLength",
      41483: "FlashEnergy",
      41484: "SpatialFrequencyResponse",
      41486: "FocalPlaneXResolution",
      41487: "FocalPlaneYResolution",
      41488: "FocalPlaneResolutionUnit",
      41492: "SubjectLocation",
      41493: "ExposureIndex",
      41495: "SensingMethod",
      41728: "FileSource",
      41729: "SceneType",
      41730: "CFAPattern",
      41985: "CustomRendered",
      41986: "ExposureMode",
      41987: "WhiteBalance",
      41988: "DigitalZoomRation",
      41989: "FocalLengthIn35mmFilm",
      41990: "SceneCaptureType",
      41991: "GainControl",
      41992: "Contrast",
      41993: "Saturation",
      41994: "Sharpness",
      41995: "DeviceSettingDescription",
      41996: "SubjectDistanceRange",
      40965: "InteroperabilityIFDPointer",
      42016: "ImageUniqueID",
      42036: "LensModel"

    },
    p = h.TiffTags = {
      256: "ImageWidth",
      257: "ImageHeight",
      34665: "ExifIFDPointer",
      34853: "GPSInfoIFDPointer",
      40965: "InteroperabilityIFDPointer",
      258: "BitsPerSample",
      259: "Compression",
      262: "PhotometricInterpretation",
      274: "Orientation",
      277: "SamplesPerPixel",
      284: "PlanarConfiguration",
      530: "YCbCrSubSampling",
      531: "YCbCrPositioning",
      282: "XResolution",
      283: "YResolution",
      296: "ResolutionUnit",
      273: "StripOffsets",
      278: "RowsPerStrip",
      279: "StripByteCounts",
      513: "JPEGInterchangeFormat",
      514: "JPEGInterchangeFormatLength",
      301: "TransferFunction",
      318: "WhitePoint",
      319: "PrimaryChromaticities",
      529: "YCbCrCoefficients",
      532: "ReferenceBlackWhite",
      306: "DateTime",
      270: "ImageDescription",
      271: "Make",
      272: "Model",
      305: "Software",
      315: "Artist",
      42036: "LensModel",
      33432: "Copyright"
    },
    S = h.GPSTags = {
      0: "GPSVersionID",
      1: "GPSLatitudeRef",
      2: "GPSLatitude",
      3: "GPSLongitudeRef",
      4: "GPSLongitude",
      5: "GPSAltitudeRef",
      6: "GPSAltitude",
      7: "GPSTimeStamp",
      8: "GPSSatellites",
      9: "GPSStatus",
      10: "GPSMeasureMode",
      11: "GPSDOP",
      12: "GPSSpeedRef",
      13: "GPSSpeed",
      14: "GPSTrackRef",
      15: "GPSTrack",
      16: "GPSImgDirectionRef",
      17: "GPSImgDirection",
      18: "GPSMapDatum",
      19: "GPSDestLatitudeRef",
      20: "GPSDestLatitude",
      21: "GPSDestLongitudeRef",
      22: "GPSDestLongitude",
      23: "GPSDestBearingRef",
      24: "GPSDestBearing",
      25: "GPSDestDistanceRef",
      26: "GPSDestDistance",
      27: "GPSProcessingMethod",
      28: "GPSAreaInformation",
      29: "GPSDateStamp",
      30: "GPSDifferential"
    },
    P = h.StringValues = {
      ExposureProgram: {
        0: "Not defined",
        1: "Manual",
        2: "Normal program",
        3: "Aperture priority",
        4: "Shutter priority",
        5: "Creative program",
        6: "Action program",
        7: "Portrait mode",
        8: "Landscape mode"
      },
      MeteringMode: {
        0: "Unknown",
        1: "Average",
        2: "CenterWeightedAverage",
        3: "Spot",
        4: "MultiSpot",
        5: "Pattern",
        6: "Partial",
        255: "Other"
      },
      LightSource: {
        0: "Unknown",
        1: "Daylight",
        2: "Fluorescent",
        3: "Tungsten (incandescent light)",
        4: "Flash",
        9: "Fine weather",
        10: "Cloudy weather",
        11: "Shade",
        12: "Daylight fluorescent (D 5700 - 7100K)",
        13: "Day white fluorescent (N 4600 - 5400K)",
        14: "Cool white fluorescent (W 3900 - 4500K)",
        15: "White fluorescent (WW 3200 - 3700K)",
        17: "Standard light A",
        18: "Standard light B",
        19: "Standard light C",
        20: "D55",
        21: "D65",
        22: "D75",
        23: "D50",
        24: "ISO studio tungsten",
        255: "Other"
      },
      Flash: {
        0: "Flash did not fire",
        1: "Flash fired",
        5: "Strobe return light not detected",
        7: "Strobe return light detected",
        9: "Flash fired, compulsory flash mode",
        13: "Flash fired, compulsory flash mode, return light not detected",
        15: "Flash fired, compulsory flash mode, return light detected",
        16: "Flash did not fire, compulsory flash mode",
        24: "Flash did not fire, auto mode",
        25: "Flash fired, auto mode",
        29: "Flash fired, auto mode, return light not detected",
        31: "Flash fired, auto mode, return light detected",
        32: "No flash function",
        65: "Flash fired, red-eye reduction mode",
        69: "Flash fired, red-eye reduction mode, return light not detected",
        71: "Flash fired, red-eye reduction mode, return light detected",
        73: "Flash fired, compulsory flash mode, red-eye reduction mode",
        77: "Flash fired, compulsory flash mode, red-eye reduction mode, return light not detected",
        79: "Flash fired, compulsory flash mode, red-eye reduction mode, return light detected",
        89: "Flash fired, auto mode, red-eye reduction mode",
        93: "Flash fired, auto mode, return light not detected, red-eye reduction mode",
        95: "Flash fired, auto mode, return light detected, red-eye reduction mode"
      },
      SensingMethod: {
        1: "Not defined",
        2: "One-chip color area sensor",
        3: "Two-chip color area sensor",
        4: "Three-chip color area sensor",
        5: "Color sequential area sensor",
        7: "Trilinear sensor",
        8: "Color sequential linear sensor"
      },
      SceneCaptureType: {
        0: "Standard",
        1: "Landscape",
        2: "Portrait",
        3: "Night scene"
      },
      SceneType: {
        1: "Directly photographed"
      },
      CustomRendered: {
        0: "Normal process",
        1: "Custom process"
      },
      WhiteBalance: {
        0: "Auto white balance",
        1: "Manual white balance"
      },
      GainControl: {
        0: "None",
        1: "Low gain up",
        2: "High gain up",
        3: "Low gain down",
        4: "High gain down"
      },
      Contrast: {
        0: "Normal",
        1: "Soft",
        2: "Hard"
      },
      Saturation: {
        0: "Normal",
        1: "Low saturation",
        2: "High saturation"
      },
      Sharpness: {
        0: "Normal",
        1: "Soft",
        2: "Hard"
      },
      SubjectDistanceRange: {
        0: "Unknown",
        1: "Macro",
        2: "Close view",
        3: "Distant view"
      },
      FileSource: {
        3: "DSC"
      },
      Components: {
        0: "",
        1: "Y",
        2: "Cb",
        3: "Cr",
        4: "R",
        5: "G",
        6: "B"
      }
    },
    F = {
      120: "caption",
      110: "credit",
      25: "keywords",
      55: "dateCreated",
      80: "byline",
      85: "bylineTitle",
      122: "captionWriter",
      105: "headline",
      116: "copyright",
      15: "category"
    };
  h.getData = function(t, n) {
    return (t instanceof Image || t instanceof HTMLImageElement) && !t.complete ? !1 : (e(t) ? n && n.call(t) : o(t, n), !0)
  }, h.getTag = function(t, n) {
    return e(t) ? t.exifdata[n] : void 0
  }, h.getAllTags = function(t) {
    if (!e(t)) return {};
    var n, r = t.exifdata,
      o = {};
    for (n in r) r.hasOwnProperty(n) && (o[n] = r[n]);
    return o
  }, h.pretty = function(t) {
    if (!e(t)) return "";
    var n, r = t.exifdata,
      o = "";
    for (n in r) r.hasOwnProperty(n) && (o += "object" == typeof r[n] ? r[n] instanceof Number ? n + " : " + r[n] + " [" + r[n].numerator + "/" + r[n].denominator + "]\r\n" : n + " : [" + r[n].length + " values]\r\n" : n + " : " + r[n] + "\r\n");
    return o
  }, h.readFromBinaryFile = function(e) {
    return i(e)
  }, "function" == typeof define && define.amd && define("exif-js", [], function() {
    return h
  })
}).call(this);

$(function() {
  $('#caption').on('click', function() {
    const file_input = $('#file-input');
    const file = file_input[0].files[0];

    // EXIF.getDataでexif情報を解析
    EXIF.getData(file, function() {
      let result1 = '';
      let result2 = '';

      const DateTimeOriginal = EXIF.getTag(this, "DateTimeOriginal");
      // EXIF.getTag(this, "[exifのタグ名]")で、値を取得
      try {
        const Date = DateTimeOriginal.substr(0, 4) + '/' + DateTimeOriginal.substr(5, 2) + '/' + DateTimeOriginal.substr(8, 2);
        if ($('#Datecheck').is(':checked')) {
          result1 += 'Date: ' + Date;
          result1 += '\r\n'
          result2 += '<撮影日> ' + Date;
          result2 += '\r\n';
        }

        if ($('#Cameracheck').is(':checked')) {
          result1 += 'Camera: ' + EXIF.getTag(this, "Model");
          result1 += '\r\n';
          result2 += '<撮影ボディ> ' + EXIF.getTag(this, "Model");
          result2 += '\r\n';
        }
        if ($('#Lenscheck').is(':checked')) {
          result1 += 'Lens: ' + EXIF.getTag(this, "LensModel");
          result1 += '\r\n';
          result2 += '<使用レンズ> ' + EXIF.getTag(this, "LensModel");
          result2 += '\r\n';
        }
        if ($('#Lengthcheck').is(':checked') ||$('#Timecheck').is(':checked') ||$('#FNumbercheck').is(':checked') ||$('#ISOcheck').is(':checked') ) {
          result2 += '<撮影設定> ';
        }
        if ($('#Lengthcheck').is(':checked')) {
          result1 += EXIF.getTag(this, "FocalLengthIn35mmFilm") + 'mm ';
          result2 += EXIF.getTag(this, "FocalLengthIn35mmFilm") + 'mm ';
        }
        if ($('#FNumbercheck').is(':checked')) {
          result1 += 'f/' + EXIF.getTag(this, "FNumber") + ' ';
          result2 += 'f/' + EXIF.getTag(this, "FNumber") + ' ';
        }
        if ($('#Timecheck').is(':checked')) {
          let second = 0;
          if (EXIF.getTag(this, "ExposureTime") < 1) {
            second = 1 / EXIF.getTag(this, "ExposureTime");
            result1 += '1/' + second + 's ';
            result2 += '1/' + second + 's ';
          } else {
            second = EXIF.getTag(this, "ExposureTime");
            result1 += '' + second + 's ';
            result2 += '' + second + 's ';
          }
        }
        if ($('#ISOcheck').is(':checked')) {
          result1 += 'ISO' + EXIF.getTag(this, "ISOSpeedRatings") + ' ';
          result2 += 'ISO' + EXIF.getTag(this, "ISOSpeedRatings") + ' ';
        }
        result1 += '\r\n';
        result2 += '\r\n';
      } catch (error) {
        result1 += "撮影情報がありません"
        result2 += "撮影情報がありません"
      }
      $('#textExif1').val(result1);
      $('#textExif2').val(result2);
    });
  });
});

$(function() {
  $('#file-input').on('change', function(e) {
    // 1枚だけ表示する
    const file = e.target.files[0];

    // ファイルのブラウザ上でのURLを取得する
    const blobUrl = window.URL.createObjectURL(file);

    // img要素に表示
    $('#preview').attr('src', blobUrl);
    // ボタンを有効化
    $("#caption").prop("disabled", false);
    $("#copyClipboard1").prop("disabled", false);
    $("#copyClipboard2").prop("disabled", false);
  });
});
