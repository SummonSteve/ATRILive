#ifndef HOLISTIC_TRACKING_API_H
#define HOLISTIC_TRACKING_API_H

#define EXPORT

#include <malloc.h>
#ifdef _WIN32
#ifdef EXPORT
#define EXPORT_API __declspec(dllexport)
#endif

#endif

#ifdef __cplusplus
extern "C"
{
#endif

#endif

	EXPORT_API int HolisticTrackingInit(const char *model_path);

	EXPORT_API int HolisticTrackingDetectFrameDirect(int image_width, int image_height, void *image_data, int *detect_result, bool show_result_image = false);

	EXPORT_API int HolisticTrackingDetectCamera(bool show_image = false);

	EXPORT_API int HolisticTrackingDispose();

#ifdef __cplusplus
}
#endif
