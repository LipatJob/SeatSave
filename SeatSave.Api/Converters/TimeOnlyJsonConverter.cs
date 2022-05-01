using Newtonsoft.Json;

namespace SeatSave.Api.Converters
{
    public sealed class TimeOnlyJsonConverter : JsonConverter<TimeOnly>
    {
        public override void WriteJson(JsonWriter writer, TimeOnly value, JsonSerializer serializer)
        {
            writer.WriteValue(value.ToString("r"));
        }

        public override TimeOnly ReadJson(JsonReader reader, Type objectType, TimeOnly existingValue, bool hasExistingValue,
            JsonSerializer serializer)
        {
            return TimeOnly.Parse(reader.ReadAsString());
        }
    }

}
