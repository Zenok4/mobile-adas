import { useEffect, useState } from 'react';
import { useAdasSettings } from './useAdasSettings';

export function useLocationWeather() {
  const { settings } = useAdasSettings();

  // Kiểm tra xem có cần chạy GPS không
  const needGPS = settings.display.showLocation || settings.display.showWeather;

  const [location, setLocation] = useState('Đang lấy vị trí...');
  const [weather, setWeather] = useState('Đang tải...');
  const [temperature, setTemperature] = useState('...');
  const [time, setTime] = useState('--:--:--');
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);

  // =====================
  //  ⏰ Đồng hồ realtime
  // =====================
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const seconds = String(now.getSeconds()).padStart(2, '0');
      setTime(`${hours}:${minutes}:${seconds}`);
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);

    return () => clearInterval(timer);
  }, []);

  // =====================
  //  📍 Lấy vị trí + thời tiết
  // =====================
  useEffect(() => {
    if (!needGPS) {
      setLocation('Đã tắt GPS');
      setWeather('--');
      setTemperature('--');
      return;
    }

    let isMounted = true;

    const fetchLocationWeather = async () => {
      try {
        // Lấy vị trí mặc định (Hà Nội) nếu không có permission
        // Sau này có thể integrate react-native-geolocation-service
        const lat = 21.0285; // Hà Nội
        const lon = 105.8542;

        setLatitude(lat);
        setLongitude(lon);

        // 1. Lấy địa chỉ nếu settings cho phép
        if (settings.display.showLocation && isMounted) {
          try {
            const geoRes = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`,
              {
                headers: {
                  Accept: 'application/json',
                  'User-Agent': 'mobileadas/1.0',
                },
              },
            );
            const geoData = await geoRes.json();
            const road = geoData.address?.road ?? '';
            const city =
              geoData.address?.city ||
              geoData.address?.town ||
              geoData.address?.village ||
              'Hà Nội';
            setLocation(`${road}, ${city}`.trim());
          } catch (err) {
            console.warn('Lỗi lấy địa chỉ:', err);
            setLocation('Hà Nội');
          }
        }

        // 2. Lấy thời tiết nếu settings cho phép
        if (
          (settings.display.showWeather || settings.display.showTemperature) &&
          isMounted
        ) {
          try {
            const wRes = await fetch(
              `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&temperature_unit=celsius`,
            );
            const wData = await wRes.json();

            if (isMounted) {
              setTemperature(`${wData.current_weather?.temperature ?? '--'}°C`);

              const code = wData.current_weather?.weathercode;
              const weatherMap: Record<number, string> = {
                0: 'Trời quang',
                1: 'Hơi mây',
                2: 'Nhiều mây',
                3: 'U ám',
                45: 'Sương mù',
                48: 'Sương mù đóng băng',
                51: 'Mưa phùn nhẹ',
                53: 'Mưa phùn',
                55: 'Mưa phùn dày',
                61: 'Mưa nhẹ',
                63: 'Mưa vừa',
                65: 'Mưa to',
                71: 'Tuyết nhẹ',
                73: 'Tuyết vừa',
                75: 'Tuyết dày',
                80: 'Mưa rào nhẹ',
                81: 'Mưa rào vừa',
                82: 'Mưa rào lớn',
                95: 'Dông',
                96: 'Dông có mưa đá nhẹ',
                99: 'Dông có mưa đá mạnh',
              };
              setWeather(weatherMap[code] ?? 'Có mây');
            }
          } catch (err) {
            console.warn('Lỗi lấy thời tiết:', err);
            if (isMounted && settings.display.showWeather) {
              setWeather('Không có dữ liệu');
            }
          }
        }
      } catch (err) {
        console.error('Lỗi hệ thống location:', err);
        setLocation('Không lấy được vị trí');
      }
    };

    fetchLocationWeather();

    // Refresh dữ liệu mỗi 5 phút
    const interval = setInterval(fetchLocationWeather, 5 * 60 * 1000);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [
    needGPS,
    settings.display.showLocation,
    settings.display.showWeather,
    settings.display.showTemperature,
  ]);

  return { location, weather, temperature, time, latitude, longitude };
}
