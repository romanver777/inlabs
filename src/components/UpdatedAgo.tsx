import { useEffect, useState } from "react";
import { StyleSheet, Text } from "react-native";

type Props = {
  since: Date;
};

export function UpdatedAgo({ since }: Props) {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const update = () => {
      setSeconds(
        Math.max(0, Math.floor((Date.now() - since.getTime()) / 1000)),
      );
    };

    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [since]);

  const text = seconds ? `${seconds} сек назад` : "только что";

  return <Text style={styles.text}>Обновлено {text}</Text>;
}

const styles = StyleSheet.create({
  text: {
    fontSize: 13,
    color: "#6b7280",
  },
});
