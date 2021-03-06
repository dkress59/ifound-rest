const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const exifSchema = new Schema({
	InteropIndex: Number,
	InteropVersion: Number,
	ProcessingSoftware: Number,
	SubfileType: Number,
	OldSubfileType: Number,
	ImageWidth: Number,
	ImageHeight: Number,
	BitsPerSample: Number,
	Compression: Number,
	PhotometricInterpretation: Number,
	Thresholding: Number,
	CellWidth: Number,
	CellLength: Number,
	FillOrder: Number,
	DocumentName: Number,
	ImageDescription: Number,
	Make: Number,
	Model: Number,
	StripOffsets: Number,
	Orientation: Number,
	SamplesPerPixel: Number,
	RowsPerStrip: Number,
	StripByteCounts: Number,
	MinSampleValue: Number,
	MaxSampleValue: Number,
	XResolution: Number,
	YResolution: Number,
	PlanarConfiguration: Number,
	PageName: Number,
	XPosition: Number,
	YPosition: Number,
	FreeOffsets: Number,
	FreeByteCounts: Number,
	GrayResponseUnit: Number,
	GrayResponseCurve: Number,
	T4Options: Number,
	T6Options: Number,
	ResolutionUnit: Number,
	PageNumber: Number,
	ColorResponseUnit: Number,
	TransferFunction: Number,
	Software: Number,
	ModifyDate: Number,
	Artist: Number,
	HostComputer: Number,
	Predictor: Number,
	WhitePoint: Number,
	PrimaryChromaticities: Number,
	ColorMap: Number,
	HalftoneHints: Number,
	TileWidth: Number,
	TileLength: Number,
	TileOffsets: Number,
	TileByteCounts: Number,
	BadFaxLines: Number,
	CleanFaxData: Number,
	ConsecutiveBadFaxLines: Number,
	SubIFD: Number,
	InkSet: Number,
	InkNames: Number,
	NumberofInks: Number,
	DotRange: Number,
	TargetPrinter: Number,
	ExtraSamples: Number,
	SampleFormat: Number,
	SMinSampleValue: Number,
	SMaxSampleValue: Number,
	TransferRange: Number,
	ClipPath: Number,
	XClipPathUnits: Number,
	YClipPathUnits: Number,
	Indexed: Number,
	JPEGTables: Number,
	OPIProxy: Number,
	GlobalParametersIFD: Number,
	ProfileType: Number,
	FaxProfile: Number,
	CodingMethods: Number,
	VersionYear: Number,
	ModeNumber: Number,
	Decode: Number,
	DefaultImageColor: Number,
	T82Options: Number,
	JPEGTables: Number,
	JPEGProc: Number,
	ThumbnailOffset: Number,
	ThumbnailLength: Number,
	JPEGRestartInterval: Number,
	JPEGLosslessPredictors: Number,
	JPEGPointTransforms: Number,
	JPEGQTables: Number,
	JPEGDCTables: Number,
	JPEGACTables: Number,
	YCbCrCoefficients: Number,
	YCbCrSubSampling: Number,
	YCbCrPositioning: Number,
	ReferenceBlackWhite: Number,
	StripRowCounts: Number,
	ApplicationNotes: Number,
	USPTOMiscellaneous: Number,
	RelatedImageFileFormat: Number,
	RelatedImageWidth: Number,
	RelatedImageHeight: Number,
	Rating: Number,
	XP_DIP_XML: Number,
	StitchInfo: Number,
	RatingPercent: Number,
	ImageID: Number,
	WangTag1: Number,
	WangAnnotation: Number,
	WangTag3: Number,
	WangTag4: Number,
	Matteing: Number,
	DataType: Number,
	ImageDepth: Number,
	TileDepth: Number,
	Model2: Number,
	CFARepeatPatternDim: Number,
	CFAPattern2: Number,
	BatteryLevel: Number,
	KodakIFD: Number,
	Copyright: Number,
	ExposureTime: Number,
	FNumber: Number,
	MDFileTag: Number,
	MDScalePixel: Number,
	MDColorTable: Number,
	MDLabName: Number,
	MDSampleInfo: Number,
	MDPrepDate: Number,
	MDPrepTime: Number,
	MDFileUnits: Number,
	PixelScale: Number,
	AdventScale: Number,
	AdventRevision: Number,
	UIC1Tag: Number,
	UIC2Tag: Number,
	UIC3Tag: Number,
	UIC4Tag: Number,
	//"IPTC-NAA": Number,
	IntergraphPacketData: Number,
	IntergraphFlagRegisters: Number,
	IntergraphMatrix: Number,
	INGRReserved: Number,
	ModelTiePoint: Number,
	Site: Number,
	ColorSequence: Number,
	IT8Header: Number,
	RasterPadding: Number,
	BitsPerRunLength: Number,
	BitsPerExtendedRunLength: Number,
	ColorTable: Number,
	ImageColorIndicator: Number,
	BackgroundColorIndicator: Number,
	ImageColorValue: Number,
	BackgroundColorValue: Number,
	PixelIntensityRange: Number,
	TransparencyIndicator: Number,
	ColorCharacterization: Number,
	HCUsage: Number,
	TrapIndicator: Number,
	CMYKEquivalent: Number,
	SEMInfo: Number,
	AFCP_IPTC: Number,
	PixelMagicJBIGOptions: Number,
	ModelTransform: Number,
	WB_GRGBLevels: Number,
	LeafData: Number,
	PhotoshopSettings: Number,
	ExifOffset: Number,
	ICC_Profile: Number,
	TIFF_FXExtensions: Number,
	MultiProfiles: Number,
	SharedData: Number,
	T88Options: Number,
	ImageLayer: Number,
	GeoTiffDirectory: Number,
	GeoTiffDoubleParams: Number,
	GeoTiffAsciiParams: Number,
	ExposureProgram: Number,
	SpectralSensitivity: Number,
	GPSInfo: Number,
	ISO: Number,
	//"Opto-ElectricConvFactor": Number,
	Interlace: Number,
	TimeZoneOffset: Number,
	SelfTimerMode: Number,
	SensitivityType: Number,
	StandardOutputSensitivity: Number,
	RecommendedExposureIndex: Number,
	ISOSpeed: Number,
	ISOSpeedLatitudeyyy: Number,
	ISOSpeedLatitudezzz: Number,
	FaxRecvParams: Number,
	FaxSubAddress: Number,
	FaxRecvTime: Number,
	LeafSubIFD: Number,
	ExifVersion: Number,
	DateTimeOriginal: Number,
	CreateDate: Number,
	ComponentsConfiguration: Number,
	CompressedBitsPerPixel: Number,
	ShutterSpeedValue: Number,
	ApertureValue: Number,
	BrightnessValue: Number,
	ExposureCompensation: Number,
	MaxApertureValue: Number,
	SubjectDistance: Number,
	MeteringMode: Number,
	LightSource: Number,
	Flash: Number,
	FocalLength: Number,
	FlashEnergy: Number,
	SpatialFrequencyResponse: Number,
	Noise: Number,
	FocalPlaneXResolution: Number,
	FocalPlaneYResolution: Number,
	FocalPlaneResolutionUnit: Number,
	ImageNumber: Number,
	SecurityClassification: Number,
	ImageHistory: Number,
	SubjectArea: Number,
	ExposureIndex: Number,
	//"TIFF-EPStandardID": Number,
	SensingMethod: Number,
	CIP3DataFile: Number,
	CIP3Sheet: Number,
	CIP3Side: Number,
	StoNits: Number,
	MakerNote: Number,
	UserComment: Number,
	SubSecTime: Number,
	SubSecTimeOriginal: Number,
	SubSecTimeDigitized: Number,
	MSDocumentText: Number,
	MSPropertySetStorage: Number,
	MSDocumentTextPosition: Number,
	ImageSourceData: Number,
	XPTitle: Number,
	XPComment: Number,
	XPAuthor: Number,
	XPKeywords: Number,
	XPSubject: Number,
	FlashpixVersion: Number,
	ColorSpace: Number,
	ExifImageWidth: Number,
	ExifImageHeight: Number,
	RelatedSoundFile: Number,
	InteropOffset: Number,
	FlashEnergy: Number,
	SpatialFrequencyResponse: Number,
	Noise: Number,
	FocalPlaneXResolution: Number,
	FocalPlaneYResolution: Number,
	FocalPlaneResolutionUnit: Number,
	ImageNumber: Number,
	SecurityClassification: Number,
	ImageHistory: Number,
	SubjectLocation: Number,
	ExposureIndex: Number,
	//"TIFF-EPStandardID": Number,
	SensingMethod: Number,
	FileSource: Number,
	SceneType: Number,
	CFAPattern: Number,
	CustomRendered: Number,
	ExposureMode: Number,
	WhiteBalance: Number,
	DigitalZoomRatio: Number,
	FocalLengthIn35mmFormat: Number,
	SceneCaptureType: Number,
	GainControl: Number,
	Contrast: Number,
	Saturation: Number,
	Sharpness: Number,
	DeviceSettingDescription: Number,
	SubjectDistanceRange: Number,
	ImageUniqueID: Number,
	OwnerName: Number,
	SerialNumber: Number,
	LensInfo: Number,
	LensMake: Number,
	LensModel: Number,
	LensSerialNumber: Number,
	GDALMetadata: Number,
	GDALNoData: Number,
	Gamma: Number,
	ExpandSoftware: Number,
	ExpandLens: Number,
	ExpandFilm: Number,
	ExpandFilterLens: Number,
	ExpandScanner: Number,
	ExpandFlashLamp: Number,
	PixelFormat: Number,
	Transformation: Number,
	Uncompressed: Number,
	ImageType: Number,
	ImageWidth: Number,
	ImageHeight: Number,
	WidthResolution: Number,
	HeightResolution: Number,
	ImageOffset: Number,
	ImageByteCount: Number,
	AlphaOffset: Number,
	AlphaByteCount: Number,
	ImageDataDiscard: Number,
	AlphaDataDiscard: Number,
	OceScanjobDesc: Number,
	OceApplicationSelector: Number,
	OceIDNumber: Number,
	OceImageLogic: Number,
	Annotations: Number,
	PrintIM: Number,
	USPTOOriginalContentType: Number,
	DNGVersion: Number,
	DNGBackwardVersion: Number,
	UniqueCameraModel: Number,
	LocalizedCameraModel: Number,
	CFAPlaneColor: Number,
	CFALayout: Number,
	LinearizationTable: Number,
	BlackLevelRepeatDim: Number,
	BlackLevel: Number,
	BlackLevelDeltaH: Number,
	BlackLevelDeltaV: Number,
	WhiteLevel: Number,
	DefaultScale: Number,
	DefaultCropOrigin: Number,
	DefaultCropSize: Number,
	ColorMatrix1: Number,
	ColorMatrix2: Number,
	CameraCalibration1: Number,
	CameraCalibration2: Number,
	ReductionMatrix1: Number,
	ReductionMatrix2: Number,
	AnalogBalance: Number,
	AsShotNeutral: Number,
	AsShotWhiteXY: Number,
	BaselineExposure: Number,
	BaselineNoise: Number,
	BaselineSharpness: Number,
	BayerGreenSplit: Number,
	LinearResponseLimit: Number,
	CameraSerialNumber: Number,
	DNGLensInfo: Number,
	ChromaBlurRadius: Number,
	AntiAliasStrength: Number,
	ShadowScale: Number,
	DNGPrivateData: Number,
	MakerNoteSafety: Number,
	RawImageSegmentation: Number,
	CalibrationIlluminant1: Number,
	CalibrationIlluminant2: Number,
	BestQualityScale: Number,
	RawDataUniqueID: Number,
	AliasLayerMetadata: Number,
	OriginalRawFileName: Number,
	OriginalRawFileData: Number,
	ActiveArea: Number,
	MaskedAreas: Number,
	AsShotICCProfile: Number,
	AsShotPreProfileMatrix: Number,
	CurrentICCProfile: Number,
	CurrentPreProfileMatrix: Number,
	ColorimetricReference: Number,
	PanasonicTitle: Number,
	PanasonicTitle2: Number,
	CameraCalibrationSig: Number,
	ProfileCalibrationSig: Number,
	ProfileIFD: Number,
	AsShotProfileName: Number,
	NoiseReductionApplied: Number,
	ProfileName: Number,
	ProfileHueSatMapDims: Number,
	ProfileHueSatMapData1: Number,
	ProfileHueSatMapData2: Number,
	ProfileToneCurve: Number,
	ProfileEmbedPolicy: Number,
	ProfileCopyright: Number,
	ForwardMatrix1: Number,
	ForwardMatrix2: Number,
	PreviewApplicationName: Number,
	PreviewApplicationVersion: Number,
	PreviewSettingsName: Number,
	PreviewSettingsDigest: Number,
	PreviewColorSpace: Number,
	PreviewDateTime: Number,
	RawImageDigest: Number,
	OriginalRawFileDigest: Number,
	SubTileBlockSize: Number,
	RowInterleaveFactor: Number,
	ProfileLookTableDims: Number,
	ProfileLookTableData: Number,
	OpcodeList1: Number,
	OpcodeList2: Number,
	OpcodeList3: Number,
	NoiseProfile: Number,
	TimeCodes: Number,
	FrameRate: Number,
	TStop: Number,
	ReelName: Number,
	OriginalDefaultFinalSize: Number,
	OriginalBestQualitySize: Number,
	OriginalDefaultCropSize: Number,
	CameraLabel: Number,
	ProfileHueSatMapEncoding: Number,
	ProfileLookTableEncoding: Number,
	BaselineExposureOffset: Number,
	DefaultBlackRender: Number,
	NewRawImageDigest: Number,
	RawToPreviewGain: Number,
	DefaultUserCrop: Number,
	Padding: Number,
	OffsetSchema: Number,
	OwnerName: Number,
	SerialNumber: Number,
	Lens: Number,
	KDC_IFD: Number,
	RawFile: Number,
	Converter: Number,
	WhiteBalance: Number,
	Exposure: Number,
	Shadows: Number,
	Brightness: Number,
	Contrast: Number,
	Saturation: Number,
	Sharpness: Number,
	Smoothness: Number,
	MoireFilte: Number
})
const gpsSchema = new Schema({
	GPSVersionID: mongoose.Schema.Types.Mixed,
	GPSLatitudeRef: String,
	GPSLatitude: Array,
	GPSLongitudeRef: String,
	GPSLongitude: Array,
	GPSAltitudeRef: String,
	GPSAltitude: Number,
	GPSTimeStamp: Number,
	GPSSatellites: Number,
	GPSStatus: Number,
	GPSMeasureMode: Number,
	GPSDOP: Number,
	GPSSpeedRef: String,
	GPSSpeed: Number,
	GPSTrackRef: String,
	GPSTrack: Number,
	GPSImgDirectionRef: String,
	GPSImgDirection: Number,
	GPSMapDatum: Number,
	GPSDestLatitudeRef: String,
	GPSDestLatitude: Number,
	GPSDestLongitudeRef: String,
	GPSDestLongitude: Number,
	GPSDestBearingRef: String,
	GPSDestBearing: Number,
	GPSDestDistanceRef: String,
	GPSDestDistance: Number,
	GPSProcessingMethod: Number,
	GPSAreaInformation: Number,
	GPSDateStamp: Number,
	GPSDifferential: Number,
	//GPSHPositioningErro: Number
})
const photoSchema = new Schema({
	_id: mongoose.Schema.Types.ObjectId,
	url: { type: String, required: true },
	isAvatar: { type: Boolean, default: 0 },
	place: { type: mongoose.Schema.Types.ObjectId, ref: 'Place', required: true },
	//author: String,
	//user: mongoose.Schema.Types.ObjectId,
	//exif: Exif.schema,
	//exif: exifSchema,
	gps: gpsSchema
});

module.exports = mongoose.model('Photo', photoSchema);